import { useMemo, useRef, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

type PriceTable = Record<number, number>;

interface SizeOption {
  value: string;
  label: string;
  prices: PriceTable;
}

interface ProductCategory {
  value: string;
  label: string;
  icon: string;
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
    label: "Листовки",
    icon: "FileText",
    note: "Плотность 115 г/м², печать 4+0 или 4+4. Срок 3–5 раб. дней.",
    sizes: FLYERS,
  },
  {
    value: "business-cards",
    label: "Визитки",
    icon: "CreditCard",
    note: "Плотность 300 г/м², печать 4+0 или 4+4.",
    sizes: BUSINESS_CARDS,
  },
  {
    value: "stickers",
    label: "Самоклейка",
    icon: "Sticker",
    note: "Основа — бумага.",
    sizes: STICKERS,
  },
];

const computePrice = (size: SizeOption | undefined, quantity: number) => {
  if (!size || quantity < 1) return 0;
  const tiers = Object.keys(size.prices).map(Number).sort((a, b) => a - b);
  if (tiers.length === 0) return 0;

  if (quantity <= tiers[0]) {
    const perUnit = size.prices[tiers[0]] / tiers[0];
    return Math.round(perUnit * quantity);
  }
  const last = tiers[tiers.length - 1];
  if (quantity >= last) {
    const perUnit = size.prices[last] / last;
    return Math.round(perUnit * quantity);
  }
  let lower = tiers[0];
  let upper = last;
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
};

const OrderForm = () => {
  const [step, setStep] = useState(1);
  const [categoryValue, setCategoryValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [quantity, setQuantity] = useState(1000);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const totalPrice = useMemo(() => computePrice(size, quantity), [size, quantity]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Неверный формат файла", {
        description: "Загрузите изображение (JPG, PNG) или PDF",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Файл слишком большой", {
        description: "Максимальный размер файла — 50 МБ",
      });
      return;
    }

    setUploadedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }

    toast.success("Файл загружен", {
      description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} МБ)`,
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Файл удалён");
  };

  const handleNextStep = () => {
    if (step === 1 && !categoryValue) {
      toast.error("Выберите категорию продукции");
      return;
    }
    if (step === 2 && (!sizeValue || quantity < 1)) {
      toast.error("Заполните все параметры");
      return;
    }
    if (step === 3 && !uploadedFile) {
      toast.error("Загрузите макет");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmitOrder = () => {
    toast.success("Заказ оформлен!", {
      description: `Сумма к оплате: ${totalPrice.toLocaleString("ru-RU")} ₽`,
    });
  };

  const resetForm = () => {
    setStep(1);
    setCategoryValue("");
    setSizeValue("");
    setQuantity(1000);
    setUploadedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-3">
            <Icon name="ShoppingCart" size={36} className="text-primary" />
            Оформление заказа
          </CardTitle>
          <Badge variant="outline" className="text-base px-4 py-2">
            Шаг {step} из 4
          </Badge>
        </div>
        <div className="flex gap-2 mt-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                Выберите категорию продукции
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.map((c) => {
                  const firstSize = c.sizes[0];
                  const firstTier = Object.keys(firstSize.prices).map(Number).sort((a, b) => a - b)[0];
                  const fromPrice = firstSize.prices[firstTier];
                  return (
                    <Card
                      key={c.value}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                        categoryValue === c.value
                          ? "border-2 border-primary bg-primary/5"
                          : "border-2 border-transparent hover:border-primary/30"
                      }`}
                      onClick={() => {
                        setCategoryValue(c.value);
                        setSizeValue("");
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon
                          name={c.icon}
                          fallback="Package"
                          size={48}
                          className={`mx-auto mb-3 ${
                            categoryValue === c.value
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <h4 className="font-semibold text-lg">{c.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          от {fromPrice.toLocaleString("ru-RU")} ₽ за {firstTier.toLocaleString("ru-RU")} шт.
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="Settings" size={24} className="text-primary" />
                Параметры заказа
              </h3>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Icon name={category?.icon || "Package"} fallback="Package" size={20} />
                <span className="font-semibold">{category?.label}</span>
              </div>
              {category?.note && (
                <p className="text-sm text-muted-foreground italic">{category.note}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-base font-semibold">
                Формат / вариант
              </Label>
              <Select value={sizeValue} onValueChange={setSizeValue}>
                <SelectTrigger id="size" className="h-12">
                  <SelectValue placeholder="Выберите формат" />
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
                  {[...tiers, 50000, 100000, 500000].map((t) => {
                    const tierPrice = size.prices[t];
                    const label = tierPrice
                      ? `${t.toLocaleString("ru-RU")} — ${tierPrice.toLocaleString("ru-RU")} ₽`
                      : t.toLocaleString("ru-RU");
                    return (
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
                          {label}
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="Upload" size={24} className="text-primary" />
                Загрузите макет
              </h3>
              <p className="text-muted-foreground mb-6">
                Поддерживаемые форматы: JPG, PNG, PDF (до 50 МБ)
              </p>
            </div>

            {!uploadedFile ? (
              <div
                className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon
                  name="Upload"
                  size={64}
                  className="mx-auto mb-4 text-primary/50"
                />
                <p className="text-lg font-semibold text-secondary mb-2">
                  Нажмите для выбора файла
                </p>
                <p className="text-sm text-muted-foreground">
                  или перетащите файл сюда
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {previewUrl ? (
                      <div className="flex-shrink-0">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-primary/30"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={48} className="text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-secondary truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} МБ
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={removeFile}
                          className="flex-shrink-0"
                        >
                          <Icon name="X" size={20} />
                        </Button>
                      </div>
                      <Badge className="mt-3" variant="outline">
                        <Icon name="CheckCircle" size={14} className="mr-1" />
                        Файл загружен
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Icon name="CheckCircle" size={24} className="text-primary" />
                Подтверждение заказа
              </h3>
              <p className="text-muted-foreground mb-6">
                Проверьте детали заказа перед оплатой
              </p>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Категория:</span>
                  <span className="font-semibold text-right">{category?.label}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Формат:</span>
                  <span className="font-semibold text-right">{size?.label}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Тираж:</span>
                  <span className="font-semibold text-right">
                    {quantity.toLocaleString("ru-RU")} шт.
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Файл:</span>
                  <span className="font-semibold text-right truncate max-w-[200px]">
                    {uploadedFile?.name}
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-3xl font-extrabold text-primary">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Срок изготовления: 3–5 рабочих дней
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && step < 4 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
          )}
          {step < 4 ? (
            <Button
              size="lg"
              onClick={handleNextStep}
              className="flex-1"
              disabled={
                (step === 1 && !categoryValue) ||
                (step === 2 && (!sizeValue || quantity < 1)) ||
                (step === 3 && !uploadedFile)
              }
            >
              Далее
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={resetForm}
                className="flex-1"
              >
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Начать заново
              </Button>
              <Button
                size="lg"
                onClick={handleSubmitOrder}
                className="flex-1"
              >
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оплатить {totalPrice.toLocaleString("ru-RU")} ₽
              </Button>
            </>
          )}
        </div>

        {totalPrice > 0 && step > 1 && step < 4 && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-secondary">
                Предварительная стоимость:
              </span>
              <span className="text-2xl font-extrabold text-primary">
                {totalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderForm;