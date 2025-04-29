"use client"

import React from "react"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { useProducts } from "../context/ProductContext"
import Image from "next/image"
import deleteImg from "@/public/delete.svg"

type Props = {
  name: string
  quantity: number
  code: string
  description: string
  date: string
}

function ProductCard({ name, quantity, code, description, date }: Props) {
  const { deleteProduct } = useProducts()

  const handleClick = () => {
    deleteProduct(code)
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className='font-bold'>{name}</div>
        <div className='flex items-center justify-center border text-xs font-bold rounded-full px-4 w-25'>
          {quantity} unidades
        </div>
      </div>
      <div>Codigo: {code}</div>
      <div className='text-sm break-words'>{description}</div>
      <div className='flex justify-between items-end'>
        <div className='text-sm'>{date}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>
              Eliminar
              <Image src={deleteImg} alt='' width={20} height={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Esta seguro de eliminar este producto?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta accion no podra ser revertida. Se perderan todos los datos
                de este producto sin posibilidad de recuperarlos
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className='bg-destructive'
                onClick={handleClick}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default ProductCard
