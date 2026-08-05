import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

/**
 * Naslov s karbon kopijom. Ghost je isti tekst u toniranoj crvenoj, u
 * `multiply`, i njegov offset vozi brzina scrolla (vidi carbonLag u lib/gsap).
 *
 * Ghost je `aria-hidden` jer je duplikat teksta, i mora biti izvan toka pa se
 * mjeri po roditelju koji drzi `relative`.
 */
export default function DocTitle({
  as: Tag = 'h2',
  children,
  className = '',
  carbon = true,
  ...rest
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  carbon?: boolean
} & Omit<ComponentPropsWithoutRef<'h2'>, 'children' | 'className'>) {
  return (
    <Tag className={`relative ${className}`} {...rest}>
      {carbon && (
        <span data-carbon aria-hidden="true" className="carbon-ghost">
          {children}
        </span>
      )}
      <span className="relative block">{children}</span>
    </Tag>
  )
}
