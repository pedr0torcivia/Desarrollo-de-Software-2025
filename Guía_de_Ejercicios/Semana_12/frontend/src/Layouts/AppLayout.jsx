import React from 'react'
import { Outlet } from 'react-router'
import Encabezado from '../components/Encabezado'

export const AppLayout = () => {
  return (
    <>
            <Encabezado />
            <Outlet/>
    </>
  )
}
