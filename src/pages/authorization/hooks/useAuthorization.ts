export enum TypeServiceAuth {
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
  YANDEX = 'YANDEX',
}

const useAuthorization = () => {
  const onAuthAnotherService = (typeAuth: TypeServiceAuth) => {
    switch (typeAuth) {
      case TypeServiceAuth.GOOGLE: {
        window.location.href = 'http://localhost:3456/api/auth/google'
        break
      }
      case TypeServiceAuth.GITHUB: {
        window.location.href = 'http://localhost:3456/api/auth/github'
        break
      }
      case TypeServiceAuth.YANDEX: {
        window.location.href = 'http://localhost:3456/api/auth/yandex'
        break
      }
    }
  }

  return { onAuthAnotherService }
}

export default useAuthorization
