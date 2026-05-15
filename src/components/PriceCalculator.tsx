import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PriceCalculatorProps {
  onOrder?: () => void;
}

type PriceTable = Record<number, number>;

interface SizeOption {
  value: string;
  label: string;
  prices: PriceTable;
}

interface ProductCategory {
  value: string;
  label: string;
  note?: string;
  sizes: SizeOption[];
}

const FLYERS: SizeOption[] = [
  { value: "a7", label: "A7 74×105 мм", prices: { 1000: 1500, 2000: 1900, 3000: 2300, 5000: 3000, 10000: 5500 } },
  { value: "a6", label: "A6 105×148 мм", prices: { 1000: 2000, 2000: 2900, 3000: 3800, 5000: 5500, 10000: 9000 } },
  { value: "a5", label: "A5 148×210 мм", prices: { 1000: 3800, 2000: 5400, 3000: 7000, 5000: 9500, 10000: 16000 } },
  { value: "euro", label: "Евро 99×210 мм", prices: { 1000: 2600, 2000: 3700, 3000: 4800, 5000: 7000, 10000: 12000 } },
  { value: "a4", label: "A4 210×297 мм", prices: { 1000: 6000, 2000: 8600, 3000: 11200, 5000: 16000, 10000: 30000 } },
  { value: "booklet-a4", label: "Буклет A4 2 сл.", prices: { 1000: 7000, 2000: 10000, 3000: 13200, 5000: 18500, 10000: 36000 } },
];

const BUSINESS_CARDS: SizeOption[] = [
  { value: "standard", label: "Визитка 300 г/м²", prices: { 1000: 1500, 2000: 2800, 3000: 4000, 5000: 6000, 10000: 11000 } },
  { value: "hole", label: "С отверстием", prices: { 1000: 2500, 2000: 4000, 3000: 6000, 5000: 9000, 10000: 17000 } },
  { value: "rounded", label: "Скруглённые углы", prices: { 1000: 3000, 2000: 4500, 3000: 6500, 5000: 10000, 10000: 18000 } },
  { value: "hole-rounded", label: "Отверстие + скр. углы", prices: { 1000: 3500, 2000: 6000, 3000: 8500, 5000: 14000, 10000: 25000 } },
  { value: "laminated", label: "С ламинацией 1+0", prices: { 1000: 3000, 2000: 4500, 3000: 6000, 5000: 9000, 10000: 17000 } },
  { value: "sticker-paper", label: "Самоклейка (бумага)", prices: { 1000: 2000, 2000: 3500, 3000: 5000, 5000: 7000, 10000: 12000 } },
];

const STICKERS: SizeOption[] = [
  { value: "50x90", label: "50×90 мм (визитка)", prices: { 1000: 2000, 2000: 3500, 5000: 7000, 10000: 12000 } },
  { value: "70x100", label: "70×100 мм", prices: { 1000: 2500, 2000: 4000, 5000: 9000, 10000: 17000 } },
  { value: "a6", label: "A6 105×148 мм", prices: { 1000: 5000, 2000: 8000, 5000: 17000, 10000: 33000 } },
  { value: "a5", label: "A5 148×210 мм", prices: { 1000: 9000, 2000: 16000, 5000: 33000, 10000: 65000 } },
  { value: "euro", label: "Евро 99×210 мм", prices: { 1000: 7000, 2000: 13000, 5000: 27000, 10000: 52000 } },
  { value: "a4", label: "A4 210×297 мм", prices: { 1000: 18000, 2000: 33000, 5000: 75000, 10000: 143000 } },
  { value: "a3", label: "A3 297×420 мм", prices: { 1000: 35000, 2000: 64000, 5000: 150000, 10000: 295000 } },
  { value: "circle-58", label: "Круг 58 или 59 мм", prices: { 1000: 2500, 2000: 4000, 5000: 8000, 10000: 15000 } },
  { value: "circle-61", label: "Круг 61 или 64 мм", prices: { 1000: 2500, 2000: 4000, 5000: 9000, 10000: 16000 } },
  { value: "circle-69", label: "Круг 69 мм", prices: { 1000: 3000, 2000: 4500, 5000: 9500, 10000: 16500 } },
  { value: "circle-89", label: "Круг 89 мм", prices: { 1000: 4000, 2000: 6000, 5000: 14000, 10000: 26000 } },
];

const CATEGORIES: ProductCategory[] = [
  {
    value: "flyers",
    label: "Листовки (115 г/м², 4+0 или 4+4)",
    note: "Срок 3–5 раб. дней. Возможны плотности 80, 90, 130, 150, 300 г/м² — цену уточняйте.",
    sizes: FLYERS,
  },
  {
    value: "business-cards",
    label: "Визитки (300 г/м², 4+0 или 4+4)",
    sizes: BUSINESS_CARDS,
  },
  {
    value: "stickers",
    label: "Самоклейка на основе бумаги",
    sizes: STICKERS,
  },
];

const PriceCalculator = ({ onOrder }: PriceCalculatorProps) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [quantity, setQuantity] = useState<number>(1000);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.value === categoryValue),
    [categoryValue],
  );
  const size = useMemo(
    () => category?.sizes.find((s) => s.value === sizeValue),
    [category, sizeValue],
  );

  const tiers = useMemo(
    () => (size ? Object.keys(size.prices).map(Number).sort((a, b) => a - b) : []),
    [size],
  );

  const totalPrice = useMemo(() => {
    if (!size || quantity < 1 || tiers.length === 0) return 0;

    if (quantity <= tiers[0]) {
      const perUnit = size.prices[tiers[0]] / tiers[0];
      return Math.round(perUnit * quantity);
    }
    if (quantity >= tiers[tiers.length - 1]) {
      const last = tiers[tiers.length - 1];
      const perUnit = size.prices[last] / last;
      return Math.round(perUnit * quantity);
    }
    let lower = tiers[0];
    let upper = tiers[tiers.length - 1];
    for (let i = 0; i < tiers.length - 1; i++) {
      if (quantity >= tiers[i] && quantity <= tiers[i + 1]) {
        lower = tiers[i];
        upper = tiers[i + 1];
        break;
      }
    }
    const pLow = size.prices[lower];
    const pUp = size.prices[upper];
    const ratio = (quantity - lower) / (upper - lower);
    return Math.round(pLow + (pUp - pLow) * ratio);
  }, [size, quantity, tiers]);

  const nearestTierHint = useMemo(() => {
    if (!size || tiers.length === 0) return null;
    const next = tiers.find((t) => t > quantity);
    if (!next) return null;
    return `При тираже ${next.toLocaleString("ru-RU")} шт. цена ${size.prices[next].toLocaleString("ru-RU")} ₽`;
  }, [size, quantity, tiers]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-2 border-primary/20 animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
          <Icon name="Calculator" size={32} className="text-primary" />
          Калькулятор стоимости
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Реальные цены по прайсу типографии
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-base font-semibold">
            Категория продукции
          </Label>
          <Select
            value={categoryValue}
            onValueChange={(v) => {
              setCategoryValue(v);
              setSizeValue("");
            }}
          >
            <SelectTrigger id="category" className="h-12">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-base font-semibold">
            Формат / вариант
          </Label>
          <Select value={sizeValue} onValueChange={setSizeValue} disabled={!category}>
            <SelectTrigger id="size" className="h-12">
              <SelectValue
                placeholder={category ? "Выберите формат" : "Сначала выберите категорию"}
              />
            </SelectTrigger>
            <SelectContent>
              {category?.sizes.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-base font-semibold">
            Тираж (шт.)
          </Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="h-12 text-lg"
          />
          {size && (
            <div className="flex flex-wrap gap-2 pt-1">
              {[...tiers, 50000, 100000, 500000].map((t) => (
                <div
                  key={t}
                  className={`inline-flex items-center rounded-full border overflow-hidden transition ${
                    quantity === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(t)}
                    className="text-xs px-3 py-1 hover:bg-muted/40"
                  >
                    {t.toLocaleString("ru-RU")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + t)}
                    title={`Добавить ${t.toLocaleString("ru-RU")} к тиражу`}
                    className="text-xs px-2 py-1 border-l border-inherit hover:bg-muted/40"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
          {nearestTierHint && (
            <p className="text-xs text-muted-foreground pt-1">{nearestTierHint}</p>
          )}
        </div>

        {category?.note && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
            {category.note}
          </p>
        )}

        <div className="pt-6 border-t-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-muted-foreground">
              Итоговая стоимость:
            </span>
            <span className="text-4xl font-extrabold text-primary">
              {totalPrice > 0 ? `${totalPrice.toLocaleString("ru-RU")} ₽` : "—"}
            </span>
          </div>

          <Button
            size="lg"
            className="w-full text-lg h-14"
            disabled={totalPrice === 0}
            onClick={onOrder}
          >
            <Icon name="ShoppingCart" size={24} className="mr-2" />
            Оформить заказ за {totalPrice > 0 ? `${totalPrice.toLocaleString("ru-RU")} ₽` : "0 ₽"}
          </Button>

          {totalPrice > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Срок изготовления: 3–5 рабочих дней
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;