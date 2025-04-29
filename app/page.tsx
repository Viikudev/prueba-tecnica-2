"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Input } from "./components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { useProducts } from "./context/ProductContext"

const ProductForm = dynamic(() => import("@/app/components/ProductForm"))
const ProductCard = dynamic(() => import("@/app/components/ProductCard"))

export default function Home() {
  const [filter, setFilter] = useState("")
  const { products } = useProducts()
  const [sort, setSort] = useState("")

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
  }

  const sortedProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "codigo") {
        return a.code.localeCompare(b.code)
      } else if (sort === "name") {
        return a.name.localeCompare(b.name)
      } else if (sort === "cantidad") {
        return a.quantity - b.quantity
      } else if (sort === "fecha") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      return 0
    })

  return (
    <>
      <header className='flex justify-center'>
        <h1 className='font-bold text-2xl'>Gestion de productos</h1>
      </header>

      <main className='max-xl:flex max-xl:flex-col xl:flex gap-10 items-start '>
        <aside className='max-sm:w-full sm:max-md:w-4/5 md:max-xl:w-4/5 self-center xl:text-xl flex flex-col justify-around w-1/4 border rounded-xl p-4 gap-4'>
          <h2 className='font-bold'>Crear Producto</h2>
          <ProductForm />
        </aside>
        <section className='max-xl:w-full flex flex-col gap-10 w-4/5'>
          <div className='flex gap-4'>
            <Input
              placeholder='Buscar por nombre...'
              value={filter}
              onChange={handleFilterChange}
            />
            <Select onValueChange={handleSortChange} value={sort}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Ordenar por' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='codigo'>Codigo</SelectItem>
                <SelectItem value='name'>Nombre</SelectItem>
                <SelectItem value='cantidad'>Cantidad</SelectItem>
                <SelectItem value='fecha'>Fecha</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className='max-xl:justify-center flex flex-wrap gap-10 gap-x-30'>
            {sortedProducts
              .filter((product) =>
                product.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((product) => (
                <li
                  key={product.code}
                  className='max-sm:w-full sm:max-lg:w-full flex flex-col border p-3 w-2/5 rounded-xl justify-between'
                >
                  <ProductCard
                    name={product.name}
                    quantity={product.quantity}
                    code={product.code}
                    description={product.description}
                    date={product.date}
                  />
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  )
}
