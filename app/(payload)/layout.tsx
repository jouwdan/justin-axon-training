import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'
import { handleServerFunctions } from './admin/actions'
import '@payloadcms/next/css'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={handleServerFunctions as unknown as Parameters<typeof RootLayout>[0]['serverFunction']}
    >
      {children}
    </RootLayout>
  )
}
