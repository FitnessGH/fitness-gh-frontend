"use client"

import { Suspense } from "react"
import { BrowseGymsContent } from "./browse-gyms-content"

export default function BrowseGymsPage() {
  return (
    <Suspense fallback={null}>
      <BrowseGymsContent />
    </Suspense>
  )
}
