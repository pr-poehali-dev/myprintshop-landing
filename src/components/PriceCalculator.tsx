import { useState } from "react";
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

const PriceCalculator = () => {
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [material, setMaterial] = useState("");
  
  const products = [
    { value: "business-cards", label: "Визитки", basePrice: 0.5 },
    { value: "posters", label: "Постеры A3", basePrice: 5 },
    { value: "flyers", label: "Листовки A5", basePrice: 1.5 },
    { value: "booklets", label: "Буклеты", basePrice: 3 },
    { value: "photobooks", label: "Фотокниги", basePrice: 15 },
    { value: "calendars", label: "Календари", basePrice: 8 },
  ];

  const materials = [
    { value: "standard", label: "Стандартная (300 г/м²)", multiplier: 1 },
    { value: "premium", label: "Премиум (350 г/м²)", multiplier: 1.3 },
    { value: "glossy", label: "Глянцевая (300 г/м²)", multiplier: 1.2 },
    { value: "matte", label: "Матовая (350 г/м²)", multiplier: 1.4 },
  ];

  const calculatePrice = () => {
    const product = products.find((p) => p.value === productType);
    const materialObj = materials.find((m) => m.value === material);
    
    if (!product || !materialObj || quantity < 1) return 0;
    
    let basePrice = product.basePrice * quantity * materialObj.multiplier;
    
    if (quantity >= 1000) basePrice *= 0.8;
    else if (quantity >= 500) basePrice *= 0.85;
    else if (quantity >= 200) basePrice *= 0.9;
    
    return Math.round(basePrice);
  };

  const totalPrice = calculatePrice();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-2 border-primary/20 animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
          <Icon name="Calculator" size={32} className="text-primary" />
          Калькулятор стоимости
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Узнайте точную цену за 30 секунд
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-type" className="text-base font-semibold">
            Тип продукции
          </Label>
          <Select value={productType} onValueChange={setProductType}>
            <SelectTrigger id="product-type" className="h-12">
              <SelectValue placeholder="Выберите тип продукции" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-base font-semibold">
            Тираж (шт.)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="h-12 text-lg"
            />
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {quantity >= 1000 && <span className="text-primary font-semibold">Скидка 20%!</span>}
              {quantity >= 500 && quantity < 1000 && <span className="text-primary font-semibold">Скидка 15%!</span>}
              {quantity >= 200 && quantity < 500 && <span className="text-primary font-semibold">Скидка 10%!</span>}
            </div>
          </div>
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

        <div className="pt-6 border-t-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-muted-foreground">
              Итоговая стоимость:
            </span>
            <span className="text-4xl font-extrabold text-primary">
              {totalPrice > 0 ? `${totalPrice.toLocaleString('ru-RU')} ₽` : '—'}
            </span>
          </div>
          
          <Button 
            size="lg" 
            className="w-full text-lg h-14"
            disabled={totalPrice === 0}
          >
            <Icon name="ShoppingCart" size={24} className="mr-2" />
            Оформить заказ за {totalPrice > 0 ? `${totalPrice.toLocaleString('ru-RU')} ₽` : '0 ₽'}
          </Button>
          
          {totalPrice > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Срок изготовления: 2-3 рабочих дня
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;
