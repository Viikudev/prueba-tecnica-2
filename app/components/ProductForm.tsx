"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
// import { Label } from "./ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { generateCode } from "@/lib/utils"
import { useProducts } from "../context/ProductContext"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Descripcion must be at least 2 characters.",
  }),
  quantity: z.number().min(1, {
    message: "Cantidad must be at least 1.",
  }),
})

function ProductForm() {
  const { addProduct } = useProducts()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const code = generateCode()
    const date = new Date().toLocaleDateString()
    const newProduct = {
      code,
      ...data,
      date,
    }

    addProduct(newProduct)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' xl:flex flex-col gap-2 '
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='Nombre' autoCapitalize='on' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input placeholder='Descripcion' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Cantidad'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Crear Producto
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
