/** @jsxImportSource @emotion/react */
import * as s from './style'
import React from 'react'

interface RootLayoutProps  {
  children: React.ReactNode;  // children 속성 타입을 추가
};

export default function RootLayout({ children } : RootLayoutProps) {
  return (
      <div css={s.fullDiv} >
        {children}
      </div>
  )
}
