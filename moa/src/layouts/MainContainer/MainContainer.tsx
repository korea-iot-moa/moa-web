/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from './style'
import useCategoryBarStore from '../../stores/categoryBar.store';
import HobbyAndRegionCategory from '../SearchBar/categotybar/HobbyAndRegionCategory';

interface RootContainerProps {
  children : React.ReactNode;
}

export default function MainContainer({ children }: RootContainerProps ) {
  const category = useCategoryBarStore((state) => state.isOpen);

  return (
    <div css={s.mainContainer}>
      {category && <HobbyAndRegionCategory />}

      {children}
    </div>
  )
}
