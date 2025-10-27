import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Recipe = {
  id: number;
  name: string;
  calories: number;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  ingredients: string[];
  liked?: boolean;
};

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Греческий салат с киноа',
    calories: 350,
    time: 15,
    difficulty: 'easy',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['киноа 100г', 'огурец 1шт', 'помидор 2шт', 'фета 50г', 'оливки 30г', 'оливковое масло 1ст.л']
  },
  {
    id: 2,
    name: 'Запечённый лосось с овощами',
    calories: 450,
    time: 35,
    difficulty: 'medium',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['лосось 150г', 'брокколи 100г', 'морковь 1шт', 'лимон 0.5шт', 'специи']
  },
  {
    id: 3,
    name: 'Овсяная каша с ягодами',
    calories: 280,
    time: 10,
    difficulty: 'easy',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['овсянка 50г', 'молоко 200мл', 'ягоды 100г', 'мёд 1ч.л']
  },
  {
    id: 4,
    name: 'Куриная грудка с гречкой',
    calories: 420,
    time: 30,
    difficulty: 'medium',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['куриная грудка 150г', 'гречка 80г', 'лук 1шт', 'морковь 1шт']
  },
  {
    id: 5,
    name: 'Фруктовый смузи-боул',
    calories: 320,
    time: 5,
    difficulty: 'easy',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['банан 2шт', 'ягоды 150г', 'греческий йогурт 100г', 'гранола 30г', 'мёд 1ч.л']
  },
  {
    id: 6,
    name: 'Борщ диетический',
    calories: 180,
    time: 60,
    difficulty: 'hard',
    image: 'https://cdn.poehali.dev/projects/65eb7456-62ce-40d4-99dd-ff6097f16b3a/files/302a35bd-699a-446b-902f-e8c7776d4b90.jpg',
    ingredients: ['свёкла 1шт', 'капуста 200г', 'морковь 1шт', 'картофель 2шт', 'томатная паста 2ст.л', 'говядина 100г']
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [calorieRange, setCalorieRange] = useState([200, 600]);
  const [timeFilter, setTimeFilter] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain',
    activity: 'moderate',
    restrictions: [] as string[]
  });

  const filteredRecipes = recipes.filter(recipe => {
    const caloriesMatch = recipe.calories >= calorieRange[0] && recipe.calories <= calorieRange[1];
    const timeMatch = timeFilter.length === 0 || 
      (timeFilter.includes('quick') && recipe.time <= 15) ||
      (timeFilter.includes('medium') && recipe.time > 15 && recipe.time <= 30) ||
      (timeFilter.includes('long') && recipe.time > 30);
    return caloriesMatch && timeMatch;
  });

  const toggleLike = (id: number) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, liked: !r.liked } : r));
  };

  const addToShoppingList = (ingredients: string[]) => {
    setShoppingList(prev => {
      const newItems = ingredients.filter(ing => !prev.includes(ing));
      return [...prev, ...newItems];
    });
  };

  const toggleTimeFilter = (filter: string) => {
    setTimeFilter(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Utensils" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Здоровое меню
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="User" size={16} />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid lg:grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={16} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="generator" className="gap-2">
              <Icon name="ChefHat" size={16} />
              Генератор меню
            </TabsTrigger>
            <TabsTrigger value="shopping" className="gap-2">
              <Icon name="ShoppingCart" size={16} />
              Покупки
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 md:p-12 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Персональное меню для ваших целей
                </h2>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  Автоматический подбор рецептов по калориям, составление списка покупок и адаптация под ваши предпочтения
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                  onClick={() => setActiveTab('generator')}
                >
                  Создать меню
                  <Icon name="ArrowRight" size={20} />
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <Icon name="Sparkles" size={300} className="absolute -right-20 -top-20" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-green-100">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name="Target" size={24} className="text-white" />
                  </div>
                  <CardTitle>Персональный подход</CardTitle>
                  <CardDescription>Учитываем ваши цели, вес, рост и уровень активности</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-emerald-100">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                    <Icon name="Brain" size={24} className="text-white" />
                  </div>
                  <CardTitle>Умная система</CardTitle>
                  <CardDescription>Обучается вашим предпочтениям и предлагает лучшие варианты</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-teal-100">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                    <Icon name="ListChecks" size={24} className="text-white" />
                  </div>
                  <CardTitle>Список покупок</CardTitle>
                  <CardDescription>Автоматически формируем список с опцией онлайн-заказа</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Рецептов опробовано</p>
                      <p className="text-3xl font-bold text-primary">127</p>
                    </div>
                    <Icon name="Award" size={40} className="text-primary" />
                  </div>
                  <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Калорий сэкономлено</p>
                      <p className="text-3xl font-bold text-secondary">12,450</p>
                    </div>
                    <Icon name="Flame" size={40} className="text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CalendarDays" size={24} />
                    План на неделю
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Понедельник', 'Вторник', 'Среда'].map((day) => (
                      <div key={day} className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                        <span className="font-medium">{day}</span>
                        <Badge variant="outline" className="gap-1">
                          <Icon name="ChefHat" size={12} />
                          3 блюда
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Icon name="Plus" size={16} />
                    Спланировать неделю
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100 mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" size={24} />
                  Полезные советы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: 'Droplets', title: 'Пейте воду', text: '2-3 литра в день помогут улучшить метаболизм' },
                    { icon: 'Moon', title: 'Здоровый сон', text: '7-8 часов сна критически важны для восстановления' },
                    { icon: 'Apple', title: 'Разнообразие', text: 'Включайте 5+ разных овощей и фруктов ежедневно' }
                  ].map((tip) => (
                    <div key={tip.title} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <Icon name={tip.icon as any} size={32} className="text-primary mb-3" />
                      <h4 className="font-semibold mb-2">{tip.title}</h4>
                      <p className="text-sm text-muted-foreground">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generator" className="space-y-6 animate-fade-in">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={24} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Калории: {calorieRange[0]} - {calorieRange[1]} ккал</label>
                  </div>
                  <Slider
                    value={calorieRange}
                    onValueChange={setCalorieRange}
                    min={100}
                    max={800}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Время приготовления</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={timeFilter.includes('quick') ? 'default' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTimeFilter('quick')}
                    >
                      <Icon name="Zap" size={14} />
                      5-15 минут
                    </Badge>
                    <Badge
                      variant={timeFilter.includes('medium') ? 'default' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTimeFilter('medium')}
                    >
                      <Icon name="Clock" size={14} />
                      30 минут
                    </Badge>
                    <Badge
                      variant={timeFilter.includes('long') ? 'default' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTimeFilter('long')}
                    >
                      <Icon name="Calendar" size={14} />
                      Выходные
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-green-100 animate-scale-in">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className="bg-white/90 text-primary backdrop-blur-sm">
                        {recipe.calories} ккал
                      </Badge>
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        <Icon name="Clock" size={12} />
                        {recipe.time} мин
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleLike(recipe.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={18}
                          className={recipe.liked ? 'fill-red-500 text-red-500' : ''}
                        />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {recipe.difficulty === 'easy' && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Icon name="ThumbsUp" size={12} />
                          Легко
                        </Badge>
                      )}
                      {recipe.difficulty === 'medium' && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                          <Icon name="Flame" size={12} />
                          Средне
                        </Badge>
                      )}
                      {recipe.difficulty === 'hard' && (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          <Icon name="Trophy" size={12} />
                          Сложно
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full gap-2"
                      onClick={() => addToShoppingList(recipe.ingredients)}
                    >
                      <Icon name="ShoppingCart" size={16} />
                      Добавить в список покупок
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-6 animate-fade-in">
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="ShoppingBasket" size={24} />
                      Список покупок
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {shoppingList.length} {shoppingList.length === 1 ? 'товар' : shoppingList.length < 5 ? 'товара' : 'товаров'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Download" size={16} />
                    Экспорт
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {shoppingList.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Список покупок пуст</p>
                    <Button onClick={() => setActiveTab('generator')}>
                      Добавить рецепты
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {shoppingList.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox id={`item-${index}`} />
                        <label 
                          htmlFor={`item-${index}`}
                          className="flex-1 cursor-pointer text-sm"
                        >
                          {item}
                        </label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShoppingList(prev => prev.filter((_, i) => i !== index))}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary">
                        <Icon name="ExternalLink" size={16} />
                        Заказать онлайн
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="UserCircle" size={24} />
                    Основная информация
                  </CardTitle>
                  <CardDescription>Расскажите о себе для персональных рекомендаций</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input 
                      id="name" 
                      placeholder="Ваше имя"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Возраст</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        placeholder="30"
                        value={userProfile.age}
                        onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Вес (кг)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        placeholder="70"
                        value={userProfile.weight}
                        onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      placeholder="170"
                      value={userProfile.height}
                      onChange={(e) => setUserProfile({...userProfile, height: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} />
                    Цели и активность
                  </CardTitle>
                  <CardDescription>Что вы хотите достичь?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Цель</Label>
                    <RadioGroup value={userProfile.goal} onValueChange={(val) => setUserProfile({...userProfile, goal: val})}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-green-50 transition-colors">
                        <RadioGroupItem value="lose" id="lose" />
                        <Label htmlFor="lose" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2">
                            <Icon name="TrendingDown" size={16} />
                            Снижение веса
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-green-50 transition-colors">
                        <RadioGroupItem value="maintain" id="maintain" />
                        <Label htmlFor="maintain" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2">
                            <Icon name="Minus" size={16} />
                            Поддержание веса
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-green-50 transition-colors">
                        <RadioGroupItem value="gain" id="gain" />
                        <Label htmlFor="gain" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2">
                            <Icon name="TrendingUp" size={16} />
                            Набор массы
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Уровень активности</Label>
                    <Select value={userProfile.activity} onValueChange={(val) => setUserProfile({...userProfile, activity: val})}>
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="Выберите уровень" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center gap-2">
                            <Icon name="Armchair" size={16} />
                            Низкий (сидячая работа)
                          </div>
                        </SelectItem>
                        <SelectItem value="moderate">
                          <div className="flex items-center gap-2">
                            <Icon name="PersonStanding" size={16} />
                            Средний (1-3 тренировки в неделю)
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center gap-2">
                            <Icon name="Dumbbell" size={16} />
                            Высокий (4-7 тренировок в неделю)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} />
                  Пищевые ограничения
                </CardTitle>
                <CardDescription>Выберите продукты, которые нужно исключить</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-3">
                  {['Глютен', 'Лактоза', 'Орехи', 'Морепродукты', 'Яйца', 'Соя', 'Мёд', 'Грибы'].map((restriction) => (
                    <div
                      key={restriction}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                        userProfile.restrictions.includes(restriction)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setUserProfile(prev => ({
                          ...prev,
                          restrictions: prev.restrictions.includes(restriction)
                            ? prev.restrictions.filter(r => r !== restriction)
                            : [...prev.restrictions, restriction]
                        }));
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{restriction}</span>
                        {userProfile.restrictions.includes(restriction) && (
                          <Icon name="Check" size={16} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Рекомендуемая калорийность</h3>
                    <p className="text-3xl font-bold text-primary">
                      {userProfile.weight && userProfile.height && userProfile.age
                        ? `${Math.round(
                            (10 * Number(userProfile.weight) + 6.25 * Number(userProfile.height) - 5 * Number(userProfile.age) + 5) *
                            (userProfile.activity === 'low' ? 1.2 : userProfile.activity === 'moderate' ? 1.55 : 1.9) *
                            (userProfile.goal === 'lose' ? 0.85 : userProfile.goal === 'gain' ? 1.15 : 1)
                          )} ккал/день`
                        : 'Заполните данные'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Расчёт по формуле Миффлина-Сан Жеора
                    </p>
                  </div>
                  <Button size="lg" className="gap-2">
                    <Icon name="Save" size={20} />
                    Сохранить профиль
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;