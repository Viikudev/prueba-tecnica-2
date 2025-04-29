import { render, screen, fireEvent } from "@testing-library/react"
import { ProductsProvider } from "@/app/context/ProductContext"
import Home from "@/app/page"

describe("Home", () => {
  it("should render the product list", async () => {
    const mockProducts = [
      {
        code: "1",
        name: "Product 1",
        descripcion: "Desc 1",
        cantidad: 1,
        date: "2025-04-29",
      },
      {
        code: "2",
        name: "Product 2",
        descripcion: "Desc 2",
        cantidad: 2,
        date: "2025-04-29",
      },
    ]

    localStorage.setItem("products", JSON.stringify(mockProducts))

    render(
      <ProductsProvider>
        <Home />
      </ProductsProvider>
    )

    expect(await screen.findByText("Product 1")).toBeInTheDocument()
    expect(await screen.findByText("Product 2")).toBeInTheDocument()
  })

  it("filters the product list", async () => {
    const mockProducts = [
      {
        code: "1",
        name: "Product 1",
        description: "Desc 1",
        quatity: 1,
        date: "2025-04-29",
      },
      {
        code: "2",
        name: "Product 2",
        description: "Desc 2",
        quantity: 2,
        date: "2025-04-29",
      },
    ]

    localStorage.setItem("products", JSON.stringify(mockProducts))

    render(
      <ProductsProvider>
        <Home />
      </ProductsProvider>
    )

    fireEvent.change(screen.getByPlaceholderText("Buscar por nombre..."), {
      target: { value: "Product 1" },
    })

    expect(screen.getByText("Product 1")).toBeInTheDocument()
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument()
  })
})
