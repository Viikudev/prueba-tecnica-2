import { renderHook, act } from "@testing-library/react"
import { ProductsProvider, useProducts } from "@/app/context/ProductContext"

describe("ProductsContext", () => {
  it("should initialize with products from localStorage", () => {
    const mockProducts = [
      {
        code: "1",
        name: "Product 1",
        descripcion: "Desc 1",
        cantidad: 1,
        date: "2025-04-29",
      },
    ]

    localStorage.setItem("products", JSON.stringify(mockProducts))

    const { result } = renderHook(() => useProducts(), {
      wrapper: ProductsProvider,
    })

    expect(result.current.products).toEqual(mockProducts)
  })

  it("should add a product to the context", () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ProductsProvider,
    })

    const newProduct = {
      code: "2",
      name: "Product 2",
      descripcion: "Desc 2",
      cantidad: 2,
      date: "2025-04-29",
    }

    act(() => {
      result.current.addProduct(newProduct)
    })

    expect(result.current.products).toContainEqual(newProduct)
  })
})
