import { render, screen, fireEvent, act } from "@testing-library/react"
import ProductForm from "@/app/components/ProductForm"
import { ProductsProvider } from "@/app/context/ProductContext"

describe("ProductForm", () => {
  it("should renders the product form", () => {
    render(
      <ProductsProvider>
        <ProductForm />
      </ProductsProvider>
    )

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Descripcion")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Cantidad")).toBeInTheDocument()
    expect(screen.getByText("Crear Producto")).toBeInTheDocument()
  })

  it("should submit the form and reset the input fields", async () => {
    render(
      <ProductsProvider>
        <ProductForm />
      </ProductsProvider>
    )

    fireEvent.change(screen.getByPlaceholderText("Nombre"), {
      target: { value: "Producto 1" },
    })
    fireEvent.change(screen.getByPlaceholderText("Descripcion"), {
      target: { value: "Descripcion del producto" },
    })
    fireEvent.change(screen.getByPlaceholderText("Cantidad"), {
      target: { value: "5" },
    })

    await act(async () => {
      fireEvent.click(screen.getByText("Crear Producto"))
    })

    expect(screen.getByPlaceholderText("Nombre")).toHaveValue("")
    expect(screen.getByPlaceholderText("Descripcion")).toHaveValue("")
    expect(screen.getByPlaceholderText("Cantidad")).toHaveValue(0)
  })
})
