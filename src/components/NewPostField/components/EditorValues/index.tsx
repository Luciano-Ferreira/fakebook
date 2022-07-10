import classNames from 'classnames'
import React, { PropsWithChildren, Ref, useRef } from 'react'
import { BaseProps } from '..'

export const EditorValues = React.forwardRef(({ className, value, ...props }: PropsWithChildren<{value: any} & BaseProps>, ref: Ref<any>) => {
  const textLines = value.document.nodes
      .map((node: any) => node.text)
      .toArray()
      .join('\n')

    return (
      <div 
        ref={ref}
        className={classNames(
          className,
          'm-[30px_-20px_0]'
        )}
      >
        <div
          className='text-sm p-[5px_20px] text-[#fff] border-t-2 border-solid border-[#eeeeee] bg-[#f8f8f8]'
        >
          Slate's value as text
        </div>
        <div
          className='text-[#404040] text-xs whitespace-pre-wrap p-[10px_20px] only:m-[0_0_0.5rem]'
        >
          {textLines}
        </div>
      </div>
    )
})