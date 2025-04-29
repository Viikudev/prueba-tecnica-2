"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

type ProductProps = {
  code: string
  name: string
  description: string
  quantity: number
  date: string
}

type ProductsContextType = {
  products: ProductProps[]
  addProduct: (product: ProductProps) => void
  deleteProduct: (code: string) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductProps[]>([])
  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  const addProduct = (product: ProductProps) => {
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  const deleteProduct = (code: string) => {
    const updatedProducts = products.filter((product) => product.code !== code)
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
