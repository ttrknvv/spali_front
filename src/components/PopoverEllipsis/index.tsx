import { useState, FC, ReactNode, CSSProperties, useEffect } from 'react'
import { Popover } from 'antd'
import Paragraph, { ParagraphProps } from 'antd/es/typography/Paragraph'
import { AbstractTooltipProps } from 'antd/lib/tooltip'

interface ITooltipEllipsis extends ParagraphProps {
  maxWidth?: number | string
  component?: ReactNode
  rows?: number
  style?: CSSProperties
  placement?: AbstractTooltipProps['placement']
  align?: AbstractTooltipProps['align']
  className?: string
  overlayClassName?: string
  overlayWidth?: number
}

const PopoverEllipsis: FC<ITooltipEllipsis> = ({
  children,
  style,
  component = children,
  maxWidth = 250,
  rows,
  placement,
  align,
  className,
  overlayClassName,
  ...props
}) => {
  const [truncated, setTruncated] = useState(false)
  const [initiated, setInitiated] = useState(false)

  useEffect(() => {
    setInitiated(true)
  }, [])

  return (
    <Popover
      className={className}
      placement={placement}
      align={align || { offset: [0, -6] }}
      overlayClassName={overlayClassName}
      overlayStyle={{
        width: props?.overlayWidth || 'fit-content',
        wordBreak: 'break-word',
      }}
      content={truncated ? component : undefined}>
      <Paragraph
        style={{
          maxWidth,
          display: 'inline-block',
          lineHeight: '1.5',
          ...(!initiated && { overflow: 'hidden', display: 'block' }),
          ...style,
        }}
        {...props}
        ellipsis={{ rows, onEllipsis: setTruncated }}>
        {children}
      </Paragraph>
    </Popover>
  )
}

export default PopoverEllipsis
