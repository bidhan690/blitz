import { Dispatch, FC, SetStateAction } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Slider } from '../ui/slider'
import { Input } from '../ui/input'
import { MultiSelect } from '../multi-select'
import { toTitleCase } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Option } from '@/types'
import { productsCategories } from '@/config/products'

interface filterSheetProps {
  isPending: boolean
  price: [number, number]
  setPrice: Dispatch<SetStateAction<[number, number]>>
  categories?: boolean
  category?: string
  subCategories: Option[]
  selectedCategories: Option[] | null
  setSelectedCategories: Dispatch<SetStateAction<Option[] | null>>
  selectedSubCategories: Option[] | null
  setSelectedSubCategories: Dispatch<SetStateAction<Option[] | null>>
}

const FilterSheet: FC<filterSheetProps> = ({ isPending, price, setPrice, categories, category, subCategories, selectedCategories, setSelectedCategories, selectedSubCategories, setSelectedSubCategories }) => {
  return <Sheet>
    <SheetTrigger asChild>
      <Button disabled={isPending}>Filter</Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Filter Products</SheetTitle>
      </SheetHeader>
      <Separator className="my-2" />
      <div className="flex flex-col gap-y-4 mt-4">
        <h3 className="text-sm text-foreground">Price range ({siteConfig.defaultPriceCurrency})</h3>
        <Slider placeholder="Select price"
          thickness="thin"
          variant="range"
          defaultValue={[0, 100000]}
          step={500}
          min={0}
          max={100000}
          value={price}
          onValueChange={(value: typeof price) => setPrice(value)}
        />
        <div className="flex items-center justify-between">
          <Input type="number" value={price[0]} onChange={(e) => {
            const value = Number(e.target.value)
            setPrice([value, price[1]])
          }} />
          <span className="mx-4 text-muted-foreground">-</span>
          <Input type="number" value={price[1]} onChange={(e) => {
            const value = Number(e.target.value)
            setPrice([price[0], value])
          }} />

        </div>
        {categories ? (
          <div className="space-y-3">
            <h3 className="text-sm text-foreground">Categories</h3>
            <MultiSelect placeholder="Select categories"
              selected={selectedCategories}
              setSelected={setSelectedCategories}
              options={productsCategories.map(item => ({
                label: toTitleCase(item.title),
                value: item.title
              }))} />
          </div>
        ) : null}
        {category?.length ? (
          <div className="space-y-3">
            <h3 className="text-sm text-foreground">Subcategories</h3>
            <MultiSelect placeholder="Select subcategories"
              selected={selectedSubCategories}
              setSelected={setSelectedSubCategories}
              options={subCategories.map(item => ({
                label: toTitleCase(item.label),
                value: item.value
              }))} />
          </div>

        ) : null}
      </div>
    </SheetContent>
  </Sheet>
}

export default FilterSheet
