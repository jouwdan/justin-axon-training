import Image from "next/image"
import { Header } from "@/components/header"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative min-h-[50vh] flex flex-col">
      <Image src="/icon.png" alt="" fill className="object-cover opacity-0" priority />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#144a73] to-[#0a2540]" />
      
      {/* Header */}
      <Header variant="transparent" />
      
      {/* Spacer for header height */}
      <div className="h-20" />
      
      {/* Page Title */}
      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 py-10 md:py-12">
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
