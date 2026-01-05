"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImageIcon, Download, RefreshCw, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

type StyleOption = {
  id: string
  name: string
  description: string
}

const styles: StyleOption[] = [
  { id: "pencil", name: "연필 스케치", description: "부드러운 연필 터치" },
  { id: "cartoon", name: "만화 스타일", description: "역동감 있는 만화" },
  { id: "disney", name: "디즈니풍", description: "동화 같은 느낌" },
  { id: "exaggerated", name: "과장된 캐리커처", description: "특징을 강조" },
]

export default function CaricaturePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [expression, setExpression] = useState<string>("default")
  const [background, setBackground] = useState<string>("white")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadSectionRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeImage = () => {
    setUploadedImage(null)
    setGeneratedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) return

    setIsGenerating(true)
    setGeneratedImage(null)

    try {
      // Create FormData
      const formData = new FormData()

      // Convert dataURL to Blob/File
      const response = await fetch(uploadedImage)
      const blob = await response.blob()
      formData.append("image", blob, "image.png")

      formData.append("style", styles.find(s => s.id === selectedStyle)?.name || selectedStyle)
      formData.append("expression", expression)
      formData.append("background", background)
      // Pass a default prompt based on selection
      formData.append("prompt", `A caricature in ${selectedStyle} style`)

      // Call API
      const apiResponse = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      const data = await apiResponse.json()

      if (!apiResponse.ok) {
        throw new Error(data.error || "Failed to generate caricature")
      }

      // Assuming the API returns the image data directly or a URL
      // If it's a base64 string without prefix, we might need to check.
      // But let's assume the API returns a usable string for src.
      setGeneratedImage(data.result)
    } catch (error) {
      console.error("Generation failed:", error)
      alert("이미지 생성에 실패했습니다. 다시 시도해 주세요.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = "my-caricature.png"
      link.click()
    }
  }

  const handleReset = () => {
    setGeneratedImage(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI 기술로 구현
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              사진 한 장으로 만드는
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                우리만의 캐리커처
              </span>
            </h1>
            <p className="mb-10 text-pretty text-lg text-muted-foreground sm:text-xl">
              사진만 올리면 AI가 자동으로 캐리커처를 그려드립니다.
              <br />몇 초 만에 특별한 캐리커처를 만나보세요.
            </p>
            <Button size="lg" onClick={scrollToUpload} className="h-12 px-8 text-base font-semibold">
              지금 만들어보기
            </Button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section ref={uploadSectionRef} className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">캐리커처 생성하기</h2>
            <p className="text-muted-foreground">사진을 업로드하고 스타일을 선택해주세요</p>
          </div>

          {/* Upload Card */}
          <Card className="mb-8 overflow-hidden border-2 p-8">
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold">1. 사진 업로드</h3>
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center transition-colors hover:border-primary hover:bg-muted/50"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="mx-auto flex flex-col items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-4 transition-transform group-hover:scale-110">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="mb-1 text-lg font-medium">사진을 업로드하세요</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG 파일 / 최대 1장</p>
                      <p className="mt-2 text-xs text-muted-foreground">드래그하거나 클릭해서 업로드</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-muted/30">
                  <div className="relative aspect-video w-full">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={removeImage}
                    className="absolute right-3 top-3 h-9 w-9 rounded-full shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Style Selection */}
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold">2. 스타일 선택</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border-2 p-4 text-left transition-all hover:border-primary hover:shadow-md",
                      selectedStyle === style.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card",
                    )}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <ImageIcon
                        className={cn(
                          "h-6 w-6 transition-colors",
                          selectedStyle === style.id ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      {selectedStyle === style.id && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="mb-1 font-semibold">{style.name}</p>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold">3. 추가 옵션 (선택사항)</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expression">표정</Label>
                  <Select value={expression} onValueChange={setExpression}>
                    <SelectTrigger id="expression">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">기본</SelectItem>
                      <SelectItem value="smile">웃는 얼굴</SelectItem>
                      <SelectItem value="serious">진지한 얼굴</SelectItem>
                      <SelectItem value="playful">장난스러운 표정</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">배경</Label>
                  <Select value={background} onValueChange={setBackground}>
                    <SelectTrigger id="background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="white">흰색 배경</SelectItem>
                      <SelectItem value="solid">단색 배경</SelectItem>
                      <SelectItem value="illustration">일러스트 배경</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={!uploadedImage || !selectedStyle || isGenerating}
                className="h-14 px-12 text-base font-semibold"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    캐리커처 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    캐리커처 생성하기
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
                  <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
                </div>
                <div>
                  <p className="mb-2 text-lg font-semibold">AI가 캐리커처를 그리고 있어요</p>
                  <p className="text-sm text-muted-foreground">잠시만 기다려주세요</p>
                </div>
              </div>
            </Card>
          )}

          {/* Result Section */}
          {generatedImage && !isGenerating && (
            <Card className="overflow-hidden border-2 border-primary/20 p-8">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold">생성 완료!</h3>
                <p className="text-muted-foreground">우리만의 캐리커처가 완성되었습니다.</p>
              </div>

              <div className="mb-8 flex justify-center">
                <div className="relative max-w-md overflow-hidden rounded-lg border-2 border-primary/20 bg-muted/30">
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated Caricature"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" onClick={handleDownload} className="font-semibold">
                  <Download className="mr-2 h-5 w-5" />
                  이미지 다운로드
                </Button>
                <Button size="lg" variant="outline" onClick={handleReset} className="font-semibold bg-transparent">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  다시 만들기
                </Button>
                <Button size="lg" variant="outline" onClick={removeImage} className="font-semibold bg-transparent">
                  <Upload className="mr-2 h-5 w-5" />
                  사진 업로드
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ⓒ 2026 우리만의 캐리커처. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
