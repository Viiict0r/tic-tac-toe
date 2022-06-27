type ClassNameString = string | boolean | null | undefined

type ClassNameObject = {
  [className: string]: boolean | null | undefined
}

type ClassNames =
  | ClassNameString
  | ClassNameObject
  | Array<ClassNameString | ClassNameObject>

export default function cx(...classNames: ClassNames[]) {
  const computedClassNames: string[] = []

  classNames.forEach(function checkClassName(className) {
    if (!className) return

    if (typeof className === 'string') {
      computedClassNames.push(className)
      return
    }
    if (Array.isArray(className)) {
      className.forEach(checkClassName)
      return
    }
    if (typeof className === 'object') {
      Object.entries(className).forEach(([className, condition]) => {
        if (!condition) return

        checkClassName(className)
      })
    }
  })

  return computedClassNames.join(' ')
}
