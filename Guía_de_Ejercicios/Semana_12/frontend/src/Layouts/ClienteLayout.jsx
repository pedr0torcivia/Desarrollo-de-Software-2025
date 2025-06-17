import React from 'react'
import { Outlet } from 'react-router'
import { EncabezadoCliente } from '../components/EncabezadoCliente'

export const ClienteLayout = () => {
  return (
    <>
        <EncabezadoCliente/>
        <Outlet/>
    </>
  )
}
