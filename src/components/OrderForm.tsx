import { useState, useRef } from "react";
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

interface ProductSize {
  value: string;
  label: string;
  priceMultiplier: number;
}

interface Product {
  value: string;
  label: string;
  icon: string;
  basePrice: number;
  sizes: ProductSize[];
}

const OrderForm = () => {
  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [material, setMaterial] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const products: Product[] = [
    {
      value: "business-cards",
      label: "Визитки",
      icon: "CreditCard",
      basePrice: 0.5,
      sizes: [
        { value: "90x50", label: "90×50 мм (стандарт)", priceMultiplier: 1 },
        { value: "85x55", label: "85×55 мм (евро)", priceMultiplier: 1.1 },
      ],
    },
    {
      value: "posters",
      label: "Постеры",
      icon: "Image",
      basePrice: 5,
      sizes: [
        { value: "a4", label: "A4 (210×297 мм)", priceMultiplier: 1 },
        { value: "a3", label: "A3 (297×420 мм)", priceMultiplier: 1.5 },
        { value: "a2", label: "A2 (420×594 мм)", priceMultiplier: 2.5 },
        { value: "a1", label: "A1 (594×841 мм)", priceMultiplier: 4 },
      ],
    },
    {
      value: "flyers",
      label: "Листовки",
      icon: "FileText",
      basePrice: 1.5,
      sizes: [
        { value: "a6", label: "A6 (105×148 мм)", priceMultiplier: 0.8 },
        { value: "a5", label: "A5 (148×210 мм)", priceMultiplier: 1 },
        { value: "a4", label: "A4 (210×297 мм)", priceMultiplier: 1.3 },
      ],
    },
    {
      value: "booklets",
      label: "Буклеты",
      icon: "Book",
      basePrice: 3,
      sizes: [
        { value: "a5", label: "A5 (148×210 мм)", priceMultiplier: 1 },
        { value: "a4", label: "A4 (210×297 мм)", priceMultiplier: 1.4 },
      ],
    },
    {
      value: "photobooks",
      label: "Фотокниги",
      icon: "BookOpen",
      basePrice: 15,
      sizes: [
        { value: "20x20", label: "20×20 см", priceMultiplier: 1 },
        { value: "30x30", label: "30×30 см", priceMultiplier: 1.8 },
      ],
    },
    {
      value: "calendars",
      label: "Календари",
      icon: "Calendar",
      basePrice: 8,
      sizes: [
        { value: "a4", label: "A4 настенный", priceMultiplier: 1 },
        { value: "a3", label: "A3 настенный", priceMultiplier: 1.5 },
      ],
    },
  ];

  const materials = [
    { value: "standard", label: "Стандартная (300 г/м²)", multiplier: 1 },
    { value: "premium", label: "Премиум (350 г/м²)", multiplier: 1.3 },
    { value: "glossy", label: "Глянцевая (300 г/м²)", multiplier: 1.2 },
    { value: "matte", label: "Матовая (350 г/м²)", multiplier: 1.4 },
  ];

  const selectedProduct = products.find((p) => p.value === productType);
  const selectedSize = selectedProduct?.sizes.find((s) => s.value === size);
  const selectedMaterial = materials.find((m) => m.value === material);

  const calculatePrice = () => {
    if (!selectedProduct || !selectedSize || !selectedMaterial || quantity < 1)
      return 0;

    let basePrice =
      selectedProduct.basePrice *
      quantity *
      selectedSize.priceMultiplier *
      selectedMaterial.multiplier;

    if (quantity >= 1000) basePrice *= 0.8;
    else if (quantity >= 500) basePrice *= 0.85;
    else if (quantity >= 200) basePrice *= 0.9;

    return Math.round(basePrice);
  };

  const totalPrice = calculatePrice();

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
    if (step === 1 && !productType) {
      toast.error("Выберите тип продукции");
      return;
    }
    if (step === 2 && (!size || !material)) {
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
    setProductType("");
    setSize("");
    setQuantity(100);
    setMaterial("");
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
                Выберите тип продукции
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card
                    key={product.value}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      productType === product.value
                        ? "border-2 border-primary bg-primary/5"
                        : "border-2 border-transparent hover:border-primary/30"
                    }`}
                    onClick={() => {
                      setProductType(product.value);
                      setSize("");
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Icon
                        name={product.icon}
                        size={48}
                        className={`mx-auto mb-3 ${
                          productType === product.value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <h4 className="font-semibold text-lg">{product.label}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        от {product.basePrice} ₽/шт
                      </p>
                    </CardContent>
                  </Card>
                ))}
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
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <Icon name={selectedProduct?.icon || "Package"} size={20} />
                <span className="font-semibold">{selectedProduct?.label}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-base font-semibold">
                Размер
              </Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size" className="h-12">
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProduct?.sizes.map((s) => (
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
              {quantity >= 200 && (
                <p className="text-sm font-semibold text-primary flex items-center gap-1">
                  <Icon name="Tag" size={16} />
                  {quantity >= 1000 && "Скидка 20%!"}
                  {quantity >= 500 && quantity < 1000 && "Скидка 15%!"}
                  {quantity >= 200 && quantity < 500 && "Скидка 10%!"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="material" className="text-base font-semibold">
                Материал
              </Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger id="material" className="h-12">
                  <SelectValue placeholder="Выберите материал" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((mat) => (
                    <SelectItem key={mat.value} value={mat.value}>
                      {mat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <span className="text-muted-foreground">Продукция:</span>
                  <span className="font-semibold text-right">
                    {selectedProduct?.label}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Размер:</span>
                  <span className="font-semibold text-right">
                    {selectedSize?.label}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Тираж:</span>
                  <span className="font-semibold text-right">
                    {quantity} шт.
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Материал:</span>
                  <span className="font-semibold text-right">
                    {selectedMaterial?.label}
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
                  Срок изготовления: 2-3 рабочих дня
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
                (step === 1 && !productType) ||
                (step === 2 && (!size || !material)) ||
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
