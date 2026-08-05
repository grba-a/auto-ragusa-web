import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Dev indikator (krug s N u kutu) se vidi samo u devu, ali smeta pri
  // vizualnoj provjeri i na screenshotima koje gleda klijent. Greske u
  // kompilaciji i runtimeu se i dalje prijavljuju.
  devIndicators: false,
}

export default nextConfig
