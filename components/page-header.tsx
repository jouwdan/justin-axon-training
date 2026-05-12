import Image from "next/image"
import { Header } from "@/components/header"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative min-h-[50vh] flex flex-col">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-only-MZLwnURIyegWpg5czkYni9Jgohgor4.png"
        alt=""
        fill
        className="object-cover"
        priority
      />
      
      {/* Header */}
      <Header variant="transparent" />
      
      {/* Spacer for header height */}
      <div className="h-20" />
      
      {/* Page Title */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
