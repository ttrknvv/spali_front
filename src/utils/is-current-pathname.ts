const isCurrentPathname = (path: string) => {
  const pathname = new URL(window.location.href).pathname
  return pathname === path
}

export default isCurrentPathname
