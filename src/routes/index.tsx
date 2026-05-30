import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  Users,
  MessagesSquare,
  Languages,
  Briefcase,
  Layers,
  Target,
  TrendingUp,
  ShieldCheck,
  Rocket,
  Inbox,
  PhoneOutgoing,
  RefreshCw,
  Handshake,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

type LanguageOption = [code: string, name: string, short: string];

type AxcendI18nApi = {
  languages: LanguageOption[];
  getLanguage: () => string;
  setLanguage: (language: string) => void;
};

declare global {
  interface Window {
    AXCEND_I18N?: AxcendI18nApi;
    AXCEND_I18N_PAYLOAD?: {
      languages: LanguageOption[];
      dictionaries: Record<string, Record<string, string>>;
    };
  }
}

const DARK_SURFACE_BASE_CLASS =
  "relative overflow-hidden border border-primary-foreground/10 bg-axcend-dark bg-[linear-gradient(145deg,#1a2e2a_0%,#142722_100%)] text-primary-foreground";

const DARK_SURFACE_GLOW_CLASS =
  "pointer-events-none absolute -right-32 -top-28 h-[28rem] w-[44rem] rounded-full bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,240,160,0.20)_0%,rgba(200,240,160,0.085)_42%,rgba(200,240,160,0.025)_66%,rgba(200,240,160,0)_84%)] blur-[72px]";

const CONTACT_WHATSAPP_URL = "https://wa.me/77085077371";
const CONTACT_TELEGRAM_URL = "https://t.me/otdel_svyazi";
const CONTACT_PHONE_PRIMARY = "+77085077371";

const FALLBACK_LANGUAGES: LanguageOption[] = [
  ["ru", "Русский", "RU"],
  ["en", "English", "EN"],
  ["de", "Deutsch", "DE"],
  ["it", "Italiano", "IT"],
  ["es", "Español", "ES"],
  ["kk", "Қазақша", "KZ"],
  ["uz", "O'zbekcha", "UZ"],
  ["ky", "Кыргызча", "KG"],
  ["hy", "Հայերեն", "AM"],
  ["ka", "ქართული", "GE"],
  ["az", "Azərbaycanca", "AZ"],
  ["ar", "العربية", "AE"],
  ["tr", "Türkçe", "TR"],
  ["ko", "한국어", "KR"],
];

const QUICK_LANGUAGES: Array<[code: string, label: string]> = [
  ["ru", "Русский"],
  ["kk", "Қазақша"],
  ["uz", "O'zbekcha"],
  ["en", "English"],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ProofGrid({ items }: { items: typeof proofs }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((p, i) => {
        const Icon = p.icon;
        const isActive = active === i;
        const isHover = hover === i;
        const lifted = isActive || isHover;
        return (
          <button
            key={p.title}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActive(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ transitionDelay: `${i * 60}ms` }}
            className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-[28px] border p-7 text-left transition-all duration-300 md:p-8 ${
              lifted
                ? "border-axcend-action bg-axcend-soft"
                : "border-border bg-card hover:border-axcend-action/70 hover:bg-axcend-soft/40"
            } ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            <div
              className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(200,240,160,0.42),rgba(200,240,160,0.12)_42%,rgba(200,240,160,0)_72%)] blur-2xl transition-opacity duration-300 ${
                lifted ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-8 left-0 top-8 w-1 rounded-r-full transition-opacity duration-300 ${
                lifted ? "bg-axcend-action opacity-100" : "opacity-0"
              }`}
            />
            <div className="relative flex h-full gap-5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                  lifted
                    ? "border-axcend-action bg-axcend-action text-axcend-dark"
                    : "border-border bg-axcend-soft text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold leading-snug text-foreground">
                  {p.title}
                </div>
                <div className="mt-4 h-px w-full bg-border/70" />
                <div className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

const sideNavItems = [
  { id: "proof", label: "Принципы" },
  { id: "what", label: "Что делаем" },
  { id: "industries", label: "Кейсы" },
  { id: "why", label: "Конверсия" },
  { id: "funnel", label: "Воронка" },
  { id: "calc", label: "Калькулятор" },
  { id: "faq", label: "FAQ" },
];

function SideNav() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sideNavItems.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 opacity-55 transition-opacity hover:opacity-100 2xl:block">
      <ul className="flex flex-col gap-3">
        {sideNavItems.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="group flex items-center justify-end gap-3">
              <span
                className={`text-xs transition-opacity ${
                  active === i.id
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}
              >
                {i.label}
              </span>
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  active === i.id
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-border group-hover:bg-muted-foreground/50"
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const heroSlides = [
  {
    country: "Казахстан",
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Central_Downtown_Astana_2.jpg/1280px-Central_Downtown_Astana_2.jpg",
  },
  {
    country: "Узбекистан",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Registan_square_Samarkand.jpg/1280px-Registan_square_Samarkand.jpg",
  },
  {
    country: "Южная Корея",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/%EA%B4%91%ED%99%94%EB%AC%B8_%EC%9B%94%EB%8C%80.jpg/1280px-%EA%B4%91%ED%99%94%EB%AC%B8_%EC%9B%94%EB%8C%80.jpg",
  },
  {
    country: "Турция",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hagia_Sophia_%28228968325%29.jpeg/1280px-Hagia_Sophia_%28228968325%29.jpeg",
  },
  {
    country: "Армения",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Mount_Ararat_and_the_Yerevan_skyline_in_spring_%2850mm%29.jpg/1280px-Mount_Ararat_and_the_Yerevan_skyline_in_spring_%2850mm%29.jpg",
  },
  {
    country: "Кыргызстан",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Issykkul_plyag.jpg/1280px-Issykkul_plyag.jpg",
  },
  {
    country: "Азербайджан",
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Flame_towers_baku.jpg/1280px-Flame_towers_baku.jpg",
  },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative isolate mx-auto w-full max-w-[420px] lg:ml-auto">
      <div className="relative z-10 rounded-[34px] bg-white/[0.055] p-2 shadow-[0_34px_92px_rgba(0,0,0,0.36),0_14px_36px_rgba(0,0,0,0.26),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-muted">
          {heroSlides.map((s, i) => (
            <img
              key={s.country}
              src={s.src}
              alt={s.country}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,46,42,0)_48%,rgba(26,46,42,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="inline-flex rounded-full bg-axcend-dark/75 px-3 py-1 text-sm font-medium text-white backdrop-blur">
              {heroSlides[index].country}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {heroSlides.map((s, i) => (
          <button
            key={s.country}
            type="button"
            aria-label={s.country}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-axcend-action" : "w-1.5 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AXCEND — Внешний отдел B2B продаж Центральная Азия" },
      {
        name: "description",
        content:
          "AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов.",
      },
    ],
  }),
});

const proofs = [
  {
    title: "Продаем сложные B2B продукты",
    text: "Опыт работы с разными бизнесами, помогает нам быстро докопаться до сути и объяснить сложный продукт человеческим языком, так, чтобы у собеседника появился повод продолжить переговоры уже с заказчиком напрямую.",
    icon: Briefcase,
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/30",
    iconColor: "text-primary",
  },
  {
    title: "Только опытные менеджеры",
    text: "Средний стаж наших менеджеров 7 лет. Это чувствуется в разговоре, они не теряются от резкого ответа, общаются с руководителями компаний на равных, не давят, не читают текст с экрана и не заканчивают звонок после первого «пришлите на почту». Они умеют держать спокойный деловой диалог, слышать настоящий интерес и отличать его от вежливого отказа.",
    icon: Target,
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/30",
    iconColor: "text-primary",
  },
  {
    title: "Высокая конверсия",
    text: "Мы не записываем в результат каждого, кто просто поднял трубку или сказал «интересно». Встречей считается только ситуация, где человек понял предложение и пожелал обсудить его с заказчиком по телефону, на видеозвонке или лично. Поэтому эта цифра показывает реальное желание стать вашим клиентом.",
    icon: PhoneOutgoing,
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/30",
    iconColor: "text-primary",
    stat: 30,
  },
  {
    title: "Гарантируем результат",
    text: "Мы заранее фиксируем минимальный результат, от 5% базы должны перейти в разговор с заказчиком. Не в «теплые контакты», не в обещания «когда-нибудь посмотреть», не в отчёт. Результатом считается понятное действие, человек хочет обсудить ваш продукт с вами. Именно это мы и гарантируем.",
    icon: ShieldCheck,
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/30",
    iconColor: "text-primary",
  },
];

const whenNeeded = [
  {
    title: "Нужны новые B2B-клиенты, но нет сильной команды продаж",
    text: "Вы не хотите нанимать, обучать и контролировать менеджеров ради проверки нового направления.",
  },
  {
    title: "Продукт сложный — его нельзя продавать по простому скрипту",
    text: "Перед контактом с рынком нужно понять продукт, экономику сделки, аргументы для руководителей и возможные возражения.",
  },
  {
    title: "Нужна база с вероятностью интереса, а не просто список",
    text: "Мы ищем компании, которым продукт может быть реально нужен: по отрасли, роли, размеру, событию и закупочной логике.",
  },
  {
    title: "Нужны встречи с клиентами, а не отчёт о звонках",
    text: "Цель работы — передача вашей команде компаний, готовых к предметному разговору, а не количество контактов.",
  },
];

const whatWeDo = [
  {
    title: "Проверенная база потенциальных клиентов",
    text: "Не случайный список компаний, а отобранная база организаций, которым продукт заказчика может быть релевантен по отрасли, размеру, географии, роли и признакам возможной потребности.",
  },
  {
    title: "Понятная карта целевой аудитории",
    text: "Заказчик получает не только контакты, но и понимание, какие сегменты рынка реагируют лучше, где интерес выше, а где предложение вызывает слабую реакцию.",
  },
  {
    title: "Предметные встречи с заинтересованными компаниями",
    text: "AXCEND передаёт не просто контакты, а компании, которые поняли предложение, проявили интерес и согласились обсудить его с командой заказчика.",
  },
  {
    title: "Контекст по каждой встрече",
    text: "Передаётся информация: кто заинтересовался, в чём причина интереса, какие вопросы возникли, какие возражения были озвучены и что важно учесть на встрече.",
  },
  {
    title: "Обратная связь с рынка",
    text: "Заказчик видит, как рынок реагирует на продукт: какие аргументы работают, какие сегменты откликаются, что мешает интересу и где требуется усилить предложение.",
  },
  {
    title: "Снижение нагрузки на внутреннюю команду",
    text: "Команда заказчика не тратит время на поиск, первичные контакты, проверку интереса и отсев нерелевантных компаний — она подключается уже на стадии предметного разговора.",
  },
];

const conversionReasons = [
  {
    title: "Консалтинговый подход",
    text: "Перед стартом продаж изучаем рынок, конкурентов и целевую аудиторию. Смотрим, какие компании нуждаются в данном продукте, как сейчас продают аналогичные решения и какие аргументы сильнее всего работают в переговорах.",
  },
  {
    title: "Работа с рыночными сигналами",
    text: "Используем профессиональные системы анализа рынка и цифрового поведения компаний. Отслеживаем активность бизнеса, изменения внутри компаний, закупочные сигналы, рост направлений, интерес к определённым решениям и другие признаки спроса. Так нам удается найти только те компании, для которых предложение действительно актуально.",
  },
  {
    title: "Принципиально не работаем по скрипту",
    text: "Наши менеджеры не работают по шаблону. В этом одно из ключевых отличий AXCEND. Благодаря опыту в консалтинге и B2B продажах наши менеджеры понимают как устроен рынок, разбираются даже в сложных продуктах, четко понимая интересы бизнеса, постепенно доводя контакт до готовности к встрече с заказчиком.",
  },
];

const guarantees = [
  { title: "Фиксируем критерии результата", text: "Не «активность», а конкретный измеримый этап." },
  {
    title: "Определяем релевантность клиента",
    text: "Компания должна соответствовать согласованному профилю.",
  },
  {
    title: "Считаем только предметные встречи",
    text: "Встреча засчитывается, если клиент понял предложение и согласился на обсуждение.",
  },
];

const cases = [
  {
    industry: "SaaS для логистики",
    text: "За 3 месяца проработали 480 целевых компаний и передали 112 встреч с лицами, принимающими решение.",
    metric: "23%",
    metricLabel: "конверсия в встречу",
  },
  {
    industry: "Промышленное оборудование",
    text: "Сформировали базу под нишевый сегмент и обеспечили стабильный поток встреч с техническими директорами и владельцами производств.",
    metric: "68",
    metricLabel: "встреч за квартал",
  },
  {
    industry: "ИТ-интегратор",
    text: "Перезапустили исходящий канал: уточнили профиль клиента, переработали аргументацию, вышли на руководителей ИТ-направлений в крупных компаниях.",
    metric: "29%",
    metricLabel: "целевых контактов во встречу",
  },
];

const compareBefore = [
  "Холодный обзвон по общему списку",
  "Скрипт без понимания продукта",
  "Менеджер без отраслевого контекста",
  "Метрика — количество звонков",
  "Размытый результат и устные обещания",
];

const compareAfter = [
  "Подбор компаний по сигналам интереса",
  "Аргументация под продукт и сегмент",
  "Менеджер разбирается в логике сделки",
  "Метрика — встречи с релевантными ЛПР",
  "Письменная гарантия результата в договоре",
];

const packages = [
  {
    tag: "под ключ",
    title: "Внешний отдел продаж",
    icon: Rocket,
    quote:
      "У нас входящие сыплются, а отвечать некому. Плюс по холодке надо звонить — а сил на это нет. Заберите всё, верните уже закрытые сделки.",
    bullets: [
      "Обрабатываем входящие заявки за 5 минут",
      "Ведём холодный поиск и прозвон",
      "Доводим до подписанного договора",
    ],
  },
  {
    tag: "входящие",
    title: "Закрываем входящие заявки",
    icon: Inbox,
    quote:
      "Маркетинг льёт лиды, а у меня один менеджер на телефоне. Половина заявок просто сгорает — не успеваем перезвонить.",
    bullets: [
      "Перезваниваем за 5 минут после заявки",
      "Квалифицируем и отсекаем нецелевых",
      "Дожимаем тёплых до сделки",
    ],
  },
  {
    tag: "исходящие",
    title: "Холодный поиск клиентов",
    icon: PhoneOutgoing,
    quote:
      "Сидим на сарафанке, а расти надо. Нужны менеджеры по продажам, которые сами найдут клиентов и наполнят воронку.",
    bullets: [
      "Собираем базу целевых компаний",
      "Прозваниваем и пишем ЛПР",
      "Передаём встречи и горячие лиды",
    ],
  },
  {
    tag: "win-back",
    title: "Реактивация базы",
    icon: RefreshCw,
    quote:
      "В CRM тысячи контактов, которые когда-то покупали или интересовались. Сейчас они просто лежат мёртвым грузом.",
    bullets: [
      "Поднимаем спящих и отвалившихся клиентов",
      "Возвращаем в активные сделки",
      "Делаем допродажи по текущей базе",
    ],
  },
  {
    tag: "новый рынок",
    title: "Выход на новый рынок",
    icon: Globe,
    quote:
      "Хотим зайти в соседнюю страну или регион, но непонятно — есть ли там спрос и с кем вообще разговаривать.",
    bullets: [
      "Проверяем спрос и считаем потенциал",
      "Находим первых клиентов и партнёров",
      "Закрываем пилотные сделки",
    ],
  },
];

const faqs = [
  {
    q: "Сможете ли вы разобраться в нашем продукте, если он сложный?",
    a: "Да. Перед стартом мы разбираем продукт, рынок, бизнес-модель, конкурентов, альтернативы и причины покупки. После этого формируем логику разговора, чтобы менеджер объяснял продукт простым коммерческим языком.",
  },
  {
    q: "Что входит в гарантию 5%?",
    a: "В гарантию входит минимальный результат: не менее 5% базы должны перейти в подтвержденный разговор с заказчиком. Критерии заинтересованного контакта, объем базы и формат подтверждения фиксируются в договоре.",
  },
  {
    q: "Вы сами собираете базу или работаете с нашей?",
    a: "Можем работать в обоих форматах. Обычно мы сами собираем и проверяем базу под заданный сегмент; если у вас есть своя база, можем дополнить, очистить и использовать ее.",
  },
  {
    q: "Как вы понимаете, кому вообще стоит звонить?",
    a: "Перед прозвоном мы описываем ICP: отрасль, масштаб, роль ЛПР, географию, признаки спроса, закупочные сигналы и ситуации, в которых продукт может быть нужен компании.",
  },
  {
    q: "Можно ли работать только по одному сегменту?",
    a: "Да. Часто лучше начать с одного сегмента, проверить реакцию рынка, аргументы и конверсию, а затем масштабировать подход на другие направления.",
  },
  {
    q: "Как мы будем видеть, что работа действительно идёт?",
    a: "Вы получаете прозрачную отчетность: статусы по базе, историю касаний, комментарии менеджеров, записи или краткие резюме диалогов и список компаний, которые дошли до встречи.",
  },
  {
    q: "Передаёте ли вы CRM, базу и историю диалогов?",
    a: "Да. По итогам работы передаем базу, статусы, контакты, историю коммуникаций и контекст по каждому заинтересованному диалогу. Формат согласуем заранее.",
  },
  {
    q: "Не испортят ли звонки нашу репутацию?",
    a: "Нет, если продукт и сегмент подходят для аккуратного B2B-диалога. Мы не давим, не читаем скрипт механически и не обещаем то, чего нет в предложении. Звонки строятся как деловой разговор.",
  },
  {
    q: "Сколько времени занимает запуск и когда ждать первые встречи?",
    a: "Обычно запуск занимает от 2 до 4 недель: диагностика продукта, сегментация, сбор базы и подготовка аргументации. Первые содержательные реакции появляются после старта прозвона; первые встречи зависят от объема базы и скорости согласований.",
  },
  {
    q: "Чем вы отличаетесь от обычного колл-центра?",
    a: "Колл-центр чаще работает по скрипту и количеству звонков. AXCEND работает на результат: понимает продукт, проверяет релевантность компании, ведет содержательный разговор и передает только тех, кто готов обсуждать предложение.",
  },
  {
    q: "Чем вы отличаетесь от найма менеджера в штат?",
    a: "Штатного менеджера нужно нанять, обучить, контролировать и обеспечить базой. AXCEND уже закрывает весь цикл: анализ рынка, база, аргументация, звонки, фиксация данных и передача встреч вашей команде.",
  },
];

const industriesData = [
  {
    name: "Строительство / Дизайн",
    cases: [
      { client: "Компания Пандора", pct: 19.0, hits: 190, total: 1000 },
      { client: "Технологии Комфорта", pct: 11.6, hits: 58, total: 500 },
      { client: "Каскад строительство", pct: 18.5, hits: 185, total: 1000 },
      { client: "ART-IDEI", pct: 44.0, hits: 1320, total: 3000 },
      { client: "Geometryka", pct: 40.0, hits: 60, total: 150 },
      { client: "Свой Интерьер", pct: 36.6, hits: 733, total: 2000 },
      { client: "Катарсис", pct: 34.8, hits: 348, total: 1000 },
      { client: "Гранд Сити", pct: 13.4, hits: 670, total: 5000 },
    ],
  },
  {
    name: "Недвижимость",
    cases: [
      { client: "ЖК «Левитан»", pct: 25.3, hits: 380, total: 1500 },
      { client: "«Садовые Кварталы»", pct: 12.0, hits: 36, total: 300 },
      { client: "Агентство «Мизель»", pct: 18.7, hits: 187, total: 1000 },
      { client: "Анфа", pct: 7.1, hits: 570, total: 8000 },
    ],
  },
  {
    name: "Торговля / опт",
    cases: [
      { client: "Автоснаб", pct: 34.6, hits: 2425, total: 7000 },
      { client: "СТК Корейская Косметика (опт)", pct: 52.2, hits: 522, total: 1000 },
      { client: "Регион Сталь", pct: 39.7, hits: 2382, total: 6000 },
      { client: "Grand Family", pct: 34.2, hits: 685, total: 2000 },
      { client: "Пилигримм", pct: 39.8, hits: 398, total: 1000 },
      { client: "FSTOK Horeca", pct: 45.0, hits: 63, total: 140 },
      { client: "Grand dog", pct: 29.8, hits: 596, total: 2000 },
    ],
  },
  {
    name: "Финансы",
    cases: [
      { client: "Carcade (Газпром)", pct: 16.3, hits: 245, total: 1500 },
      { client: "Банк ВТБ", pct: 13.1, hits: 55, total: 420 },
      { client: "Совкомбанк (поток 1)", pct: 21.6, hits: 108, total: 500 },
      { client: "Совкомбанк (поток 2)", pct: 21.4, hits: 30, total: 140 },
      { client: "Крокус Банк", pct: 16.3, hits: 326, total: 2000 },
      { client: "Агапаро Финанс", pct: 12.8, hits: 64, total: 500 },
      { client: "Тринфико", pct: 4.7, hits: 94, total: 2000 },
      { client: "Freedom Broker", pct: 11.7, hits: 117, total: 1000 },
      { client: "Славян Банк", pct: 26.2, hits: 525, total: 2000 },
      { client: "СДМ Банк", pct: 27.8, hits: 278, total: 1000 },
      { client: "ФинМарина", pct: 23.9, hits: 358, total: 1500 },
    ],
  },
  {
    name: "Банк / инвестпрограммы",
    cases: [
      { client: "Aton", pct: 6.2, hits: 185, total: 3000 },
      { client: "Jet Lend (кредитование)", pct: 47.9, hits: 67, total: 140 },
    ],
  },
  {
    name: "Медицина / оборудование",
    cases: [
      { client: "Компания Yucera", pct: 29.5, hits: 295, total: 1000 },
      { client: "Компания МедРесурс", pct: 15.7, hits: 22, total: 140 },
      { client: "Компания Medical Dubai", pct: 29.6, hits: 148, total: 500 },
      { client: "Доктор Хорошев", pct: 25.8, hits: 774, total: 3000 },
      { client: "УЛЦ «Качество»", pct: 17.0, hits: 680, total: 4000 },
      { client: "Инкор Медицинские Сертификаты", pct: 46.4, hits: 232, total: 500 },
      { client: "BIOCARD Logistics", pct: 27.8, hits: 1112, total: 4000 },
      { client: "Доктор Андрей Баранов", pct: 54.7, hits: 711, total: 1300 },
      { client: "Aesthetix", pct: 19.3, hits: 385, total: 2000 },
    ],
  },
  {
    name: "Спецтехника",
    cases: [
      { client: "ТСК Спецартс", pct: 46.3, hits: 139, total: 300 },
      { client: "Транстехгрупп (вилочные погрузчики)", pct: 8.5, hits: 425, total: 5000 },
      { client: "Тракмаркет", pct: 8.5, hits: 256, total: 3000 },
    ],
  },
  {
    name: "Техника",
    cases: [
      { client: "Компания Apple Store", pct: 32.7, hits: 98, total: 300 },
      { client: "Idoc Сервис", pct: 60.4, hits: 302, total: 500 },
      { client: "Пром. инженерное оборудование «Target»", pct: 29.0, hits: 87, total: 300 },
    ],
  },
  {
    name: "Одежда",
    cases: [
      { client: "Сеть магазинов «Богатырь»", pct: 33.6, hits: 94, total: 280 },
      { client: "Дипломат (мужская одежда)", pct: 43.2, hits: 2160, total: 5000 },
      { client: "Nadee Clo", pct: 39.8, hits: 398, total: 1000 },
    ],
  },
  {
    name: "Обучение / Курсы",
    cases: [
      { client: "Эбру", pct: 43.5, hits: 435, total: 1000 },
      { client: "Ксения Замятина (курсы англ.)", pct: 47.0, hits: 235, total: 500 },
    ],
  },
  {
    name: "Модельные агентства",
    cases: [
      { client: "Model Lab", pct: 24.0, hits: 72, total: 300 },
      { client: "TSD Camp", pct: 30.4, hits: 76, total: 250 },
    ],
  },
  {
    name: "Тренинги / Семинары",
    cases: [
      { client: "Радислав Гандапас", pct: 34.3, hits: 48, total: 140 },
      { client: "Анна Бушева", pct: 35.2, hits: 88, total: 250 },
      { client: "Юлия Смирнова «Ставки на себя»", pct: 31.4, hits: 44, total: 140 },
    ],
  },
  {
    name: "Энергетика",
    cases: [{ client: "Нефтяная компания «Квант Актив»", pct: 4.9, hits: 97, total: 2000 }],
  },
];

function WhatWeDoTabs() {
  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList className="-mx-6 grid h-auto w-[calc(100%+3rem)] auto-cols-[minmax(180px,230px)] grid-flow-col grid-rows-2 items-stretch justify-start gap-2 overflow-x-auto bg-transparent px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex md:w-full md:flex-wrap md:items-center md:justify-center md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {whatWeDo.map((s, i) => (
          <TabsTrigger
            key={s.title}
            value={String(i)}
            className="min-h-10 w-full max-w-[230px] whitespace-normal rounded-full border border-border bg-card px-3 py-2 text-center text-[13px] leading-tight text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-axcend-action data-[state=active]:bg-axcend-action data-[state=active]:text-axcend-dark data-[state=active]:shadow-none md:min-h-0 md:w-auto md:max-w-full md:px-4 md:text-sm md:leading-snug"
          >
            {s.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {whatWeDo.map((s, i) => (
        <TabsContent key={s.title} value={String(i)} className="mt-8">
          <div className="relative overflow-hidden rounded-[28px] border border-axcend-action bg-axcend-soft p-8 md:p-10">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full bg-axcend-action" />
            <div className="relative">
              <h3 className="text-2xl font-semibold text-foreground md:text-3xl">{s.title}</h3>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function IndustriesShowcase() {
  const [active, setActive] = useState(0);
  const current = industriesData[active];
  const totalDialogs = current.cases.reduce((s, c) => s + c.total, 0);
  const totalHits = current.cases.reduce((s, c) => s + c.hits, 0);
  const avg = totalDialogs ? (totalHits / totalDialogs) * 100 : 0;
  const best = current.cases.reduce((m, c) => (c.pct > m ? c.pct : m), 0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
      {/* Left column: stat tile + industries rail */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-[30px] border border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-axcend-action/60 bg-axcend-soft text-axcend-dark">
              <Layers className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Отраслей в работе
              </div>
              <div className="mt-1 text-2xl font-semibold text-foreground tabular-nums">
                {industriesData.length}+
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[30px] border border-border bg-card p-2">
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {industriesData.map((ind, i) => {
              const isActive = i === active;
              return (
                <li key={ind.name} className="relative shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group relative flex min-h-[46px] min-w-[230px] items-center gap-3 overflow-hidden rounded-[18px] border px-3 py-2 text-left transition-all duration-200 lg:w-full lg:min-w-0 ${
                      isActive
                        ? "border-axcend-action/70 bg-axcend-soft text-axcend-dark"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`absolute bottom-2 left-0 top-2 w-[3px] rounded-full transition-opacity duration-200 ${
                        isActive ? "bg-axcend-action opacity-100" : "bg-transparent opacity-0"
                      }`}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium leading-snug">
                      {ind.name}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isActive
                          ? "border-axcend-action bg-axcend-action text-axcend-dark opacity-100"
                          : "border-border bg-card text-muted-foreground opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Right detail panel */}
      <div key={active} className={`${DARK_SURFACE_BASE_CLASS} rounded-[30px] p-5 sm:p-7 md:p-9`}>
        <div className={`${DARK_SURFACE_GLOW_CLASS} hidden md:block`} />
        <div className="relative z-10">
          <div className="grid gap-5 border-b border-primary-foreground/15 pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-axcend-action/80">
                Отрасль
              </div>
              <h3 className="mt-2 text-[22px] font-semibold leading-tight text-primary-foreground sm:text-2xl md:text-[32px]">
                {current.name}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.055] px-3 py-3 sm:min-w-[136px] sm:px-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/55">
                  Средняя конверсия
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-primary-foreground">
                  {avg.toFixed(1)}%
                </div>
              </div>
              <div className="rounded-2xl border border-axcend-action/30 bg-axcend-action/10 px-3 py-3 sm:min-w-[136px] sm:px-4">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/55">
                  Лучший результат
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-axcend-action">
                  {best.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-6 max-h-[460px] space-y-3 overflow-y-auto pr-2 [scrollbar-color:var(--axcend-action)_rgba(255,255,255,0.12)] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-axcend-action/70 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary-foreground/10">
            {current.cases.map((c) => {
              const bar = Math.min(100, Math.max(3, c.pct * 1.6));
              return (
                <li
                  key={c.client}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.045] px-4 py-3.5 transition-colors hover:border-axcend-action/40 hover:bg-primary-foreground/[0.08]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 text-sm font-medium leading-snug text-primary-foreground">
                      {c.client}
                    </div>
                    <div className="shrink-0 text-base font-semibold tabular-nums text-axcend-action">
                      {c.pct.toFixed(1)}%
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-foreground/10">
                      <div
                        className="h-full rounded-full bg-axcend-action"
                        style={{ width: `${bar}%` }}
                      />
                    </div>
                    <div className="shrink-0 text-[11px] tabular-nums text-primary-foreground/60">
                      {c.hits.toLocaleString("ru-RU")} из {c.total.toLocaleString("ru-RU")} диалогов
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PackagesSelector() {
  const [active, setActive] = useState(0);
  const current = packages[active];
  const Icon = current.icon;
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-12">
      {/* Left rail — selector */}
      <div className="relative self-start rounded-[26px] border border-border bg-card p-2 shadow-none lg:sticky lg:top-28 lg:rounded-[30px]">
        <ul className="grid auto-cols-[minmax(184px,220px)] grid-flow-col grid-rows-2 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {packages.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.title} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex min-h-[72px] w-full max-w-[220px] items-center gap-3 overflow-hidden rounded-[20px] border px-3 py-3 text-left transition-all duration-200 lg:min-h-[82px] lg:max-w-full lg:gap-4 lg:rounded-[22px] lg:px-4 lg:py-4 ${
                    isActive
                      ? "border-axcend-action/70 bg-axcend-soft text-axcend-dark"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/70 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`absolute bottom-4 left-0 top-4 w-[3px] rounded-full transition-opacity duration-200 ${
                      isActive ? "bg-axcend-action opacity-100" : "bg-transparent opacity-0"
                    }`}
                  />
                  <span className="flex-1">
                    <span
                      className={`block text-[10px] font-medium uppercase tracking-[0.18em] lg:text-xs ${
                        isActive ? "text-axcend-dark/60" : "text-muted-foreground/80"
                      }`}
                    >
                      {p.tag}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-snug lg:text-base">
                      {p.title}
                    </span>
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isActive
                        ? "border-axcend-action bg-axcend-action text-axcend-dark opacity-100"
                        : "border-border bg-card text-muted-foreground opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right detail panel */}
      <div
        key={active}
        className={`${DARK_SURFACE_BASE_CLASS} flex min-h-[420px] rounded-[26px] p-6 md:p-9 lg:min-h-[480px] lg:rounded-[30px]`}
      >
        <div className={`${DARK_SURFACE_GLOW_CLASS} hidden md:block`} />
        <div className="relative z-10 flex w-full flex-col">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-axcend-action/25 bg-axcend-action/10 text-axcend-action md:h-14 md:w-14">
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-axcend-action/80">
              {current.tag}
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-semibold leading-tight text-primary-foreground md:mt-8 md:text-[32px]">
            {current.title}
          </h3>
          <blockquote className="mt-5 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.055] px-4 py-3 text-[15px] italic leading-relaxed text-primary-foreground/80 md:mt-6 md:px-5 md:py-4 md:text-lg">
            «{current.quote}»
          </blockquote>
          <ul className="mt-6 grid gap-2.5 md:mt-8 md:gap-3">
            {current.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] px-3 py-2.5 text-sm leading-relaxed text-primary-foreground md:px-4 md:py-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-axcend-action/15 text-axcend-action">
                  <Check className="h-3 w-3" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col items-start gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-xs tabular-nums text-primary-foreground/60">
              {String(active + 1).padStart(2, "0")}{" "}
              <span className="text-primary-foreground/40">
                / {String(packages.length).padStart(2, "0")}
              </span>
            </div>
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-axcend-action px-4 py-2 text-sm font-medium text-axcend-dark transition-opacity hover:opacity-90 sm:w-auto"
            >
              Обсудить пакет
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Compare() {
  const [pos, setPos] = useState(50);
  const beforeOpacity = 0.35 + ((100 - pos) / 100) * 0.65;
  const afterOpacity = 0.35 + (pos / 100) * 0.65;
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className="rounded-2xl border border-border bg-card p-8 transition-opacity"
          style={{ opacity: beforeOpacity }}
        >
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Без AXCEND
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {compareBefore.map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-2 h-px w-3 shrink-0 bg-muted-foreground/40" />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-2xl border border-primary/30 bg-card p-8 shadow-sm transition-opacity"
          style={{ opacity: afterOpacity }}
        >
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            С AXCEND
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-foreground">
            {compareAfter.map((l) => (
              <li key={l} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-md">
        <Slider value={[pos]} onValueChange={(v) => setPos(v[0])} min={0} max={100} step={1} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Без AXCEND</span>
          <span>С AXCEND</span>
        </div>
      </div>
    </div>
  );
}

function CalcRow({
  label,
  value,
  set,
  min,
  max,
  step,
  unit,
  fmt,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  fmt: (n: number) => string;
}) {
  return (
    <div className="rounded-[24px] border border-border bg-background/95 p-4 shadow-[0_14px_34px_rgba(26,46,42,0.035)] transition-colors hover:border-axcend-action/45 md:p-5">
      <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5">
        <label className="max-w-[340px] text-sm font-semibold leading-snug text-foreground">
          {label}
        </label>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => set(Math.max(min, value - step))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:border-axcend-action hover:bg-axcend-soft hover:text-foreground"
            aria-label="Уменьшить"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="min-w-[108px] rounded-full border border-border bg-background px-3 py-2 text-center text-sm font-semibold tabular-nums text-foreground">
            {fmt(value)} {unit}
          </span>
          <button
            type="button"
            onClick={() => set(Math.min(max, value + step))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition-colors hover:border-axcend-action hover:bg-axcend-soft hover:text-foreground"
            aria-label="Увеличить"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <Slider
        className="px-1"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => set(v[0])}
      />
    </div>
  );
}

function Calculator() {
  const [companies, setCompanies] = useState(500);
  const [conversion, setConversion] = useState(20);
  const [avgDeal, setAvgDeal] = useState(5000);
  const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);
  const guaranteeRate = 5;
  const guaranteeMeetings = Math.round((companies * guaranteeRate) / 100);
  const meetings = Math.round((companies * conversion) / 100);
  const revenue = meetings * avgDeal;
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-card p-5 shadow-[0_26px_80px_rgba(26,46,42,0.06)] md:p-6">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-axcend-soft blur-3xl" />
        <div className="relative z-10 mb-5 flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xl font-semibold text-foreground">Параметры</div>
          </div>
          <div className="rounded-full border border-axcend-action/40 bg-axcend-soft px-4 py-2 text-sm font-semibold text-axcend-dark">
            5% в договоре
          </div>
        </div>
        <div className="relative z-10 space-y-3 rounded-[28px] border border-border bg-muted/55 p-3 md:p-4">
          <CalcRow
            label="Размер базы целевых компаний"
            value={companies}
            set={setCompanies}
            min={100}
            max={3000}
            step={50}
            fmt={fmt}
          />
          <CalcRow
            label="Конверсия"
            value={conversion}
            set={setConversion}
            min={5}
            max={30}
            step={1}
            unit="%"
            fmt={fmt}
          />
          <CalcRow
            label="Цена продаваемого продукта/услуги, $"
            value={avgDeal}
            set={setAvgDeal}
            min={500}
            max={50000}
            step={500}
            fmt={fmt}
          />
        </div>

        <div className="relative z-10 mt-4 grid grid-cols-1 overflow-hidden rounded-[26px] border border-border bg-background text-left shadow-[0_16px_36px_rgba(26,46,42,0.035)] sm:grid-cols-3">
          <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              База
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
              {fmt(companies)}
            </div>
          </div>
          <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Гарантия
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
              {guaranteeRate}%
            </div>
          </div>
          <div className="bg-axcend-soft p-4">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Минимум
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
              {fmt(guaranteeMeetings)}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${DARK_SURFACE_BASE_CLASS} self-start rounded-[30px] p-7 md:p-8 lg:sticky lg:top-28`}
      >
        <div className={`${DARK_SURFACE_GLOW_CLASS} hidden md:block`} />
        <div className="relative z-10">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/60">
            Расчёт результата
          </div>

          <div className="mt-7 space-y-4">
            <div className="rounded-2xl border border-axcend-action/35 bg-axcend-action/12 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-semibold leading-none tabular-nums text-axcend-action">
                      {fmt(guaranteeMeetings)}
                    </span>
                    <span className="pb-1 text-sm font-medium text-primary-foreground/70">
                      встреч
                    </span>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 shrink-0 text-axcend-action" />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-primary-foreground/70">
                Минимум 5% выбранной базы должны перейти в предметный разговор с заказчиком.
              </p>
            </div>

            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.055] p-5">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/60">
                Потенциал при выбранной конверсии
              </div>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <div className="text-4xl font-semibold leading-none tabular-nums text-primary-foreground">
                    {fmt(meetings)}
                  </div>
                  <div className="mt-1 text-xs text-primary-foreground/60">предметных встреч</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold leading-none tabular-nums text-axcend-action">
                    ${fmt(revenue)}
                  </div>
                  <div className="mt-1 text-xs text-primary-foreground/60">
                    потенциальная выручка
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-4 text-xs leading-relaxed text-primary-foreground/70">
              Оценка ориентировочная. Точная модель строится после диагностики продукта и сегмента,
              но договорный минимум 5% гарантирован.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto max-w-2xl space-y-1 rounded-[22px] border border-border bg-muted p-1 md:space-y-1.5 md:rounded-[26px] md:p-1.5"
    >
      {faqs.map((f, i) => (
        <AccordionItem
          key={i}
          value={String(i)}
          className="rounded-[18px] border border-transparent bg-card px-4 transition-colors data-[state=open]:border-axcend-action/70 data-[state=open]:bg-axcend-soft md:rounded-[20px] md:px-5"
        >
          <AccordionTrigger className="py-3 text-left text-[15px] font-semibold leading-snug text-foreground hover:no-underline md:py-4 md:text-base [&>svg]:text-muted-foreground">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-3 pr-6 text-sm leading-relaxed text-muted-foreground md:pb-4 md:pr-8">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  center,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow && (
            <div className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl font-semibold leading-[1.15] text-foreground md:text-5xl">
            {title}
          </h2>
        </div>
        <Reveal className="mt-14 md:mt-20">{children}</Reveal>
      </div>
    </section>
  );
}

function ConversionSystem({ items }: { items: typeof conversionReasons }) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateActiveCard = () => {
      frame = 0;
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--axcend-header-height"),
        ) || 76;
      const readingLine = Math.min(
        window.innerHeight - 1,
        headerHeight + Math.max(250, Math.min(360, (window.innerHeight - headerHeight) * 0.46)),
      );
      let nextActive: number | null = null;
      let nextDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.bottom < headerHeight || rect.top > window.innerHeight) return;

        const containsReadingLine = rect.top <= readingLine && rect.bottom >= readingLine;
        const distance = containsReadingLine
          ? 0
          : Math.min(Math.abs(rect.top - readingLine), Math.abs(rect.bottom - readingLine));

        if (distance < nextDistance) {
          nextDistance = distance;
          nextActive = index;
        }
      });

      if (nextActive !== null) {
        setActive((current) => (current === nextActive ? current : nextActive));
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveCard);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items.length]);

  useEffect(() => {
    const language = window.AXCEND_I18N?.getLanguage();
    if (!language || language === "ru") return;

    const timeoutId = window.setTimeout(() => {
      window.AXCEND_I18N?.setLanguage(language);
    }, 40);

    return () => window.clearTimeout(timeoutId);
  }, [active]);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4">
      <div className="grid gap-4">
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              type="button"
              aria-pressed={isActive}
              data-conversion-card={index}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`group relative overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-axcend-action/40 ${
                isActive ? "border-axcend-action bg-axcend-soft" : "border-border bg-card"
              }`}
            >
              <div
                className={`pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full transition-opacity duration-300 ${
                  isActive ? "bg-axcend-action opacity-100" : "bg-transparent opacity-0"
                }`}
              />
              <div className="flex gap-5">
                <ConversionGlyph index={index} active={isActive} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-4 h-px w-full bg-border/70" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConversionGlyph({ index, active }: { index: number; active: boolean }) {
  const Icon = [Target, TrendingUp, MessagesSquare][index] ?? Target;
  return (
    <span
      className={`relative mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
        active
          ? "border-axcend-action bg-axcend-action text-axcend-dark"
          : "border-border bg-axcend-soft text-muted-foreground"
      }`}
      aria-hidden
    >
      <Icon className="h-5 w-5" strokeWidth={1.9} />
    </span>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2.1a9.82 9.82 0 0 0-8.5 14.75L2.25 21.9l5.16-1.25a9.82 9.82 0 1 0 4.63-18.55Zm0 1.7a8.12 8.12 0 0 1 6.93 12.36 8.08 8.08 0 0 1-9.89 2.9l-.34-.16-3.47.84.86-3.38-.18-.35A8.12 8.12 0 0 1 12.04 3.8Zm-3.4 4.28c-.18 0-.47.07-.72.34-.25.28-.95.93-.95 2.25 0 1.33.98 2.62 1.12 2.8.14.19 1.91 3.05 4.72 4.15 2.33.92 2.82.74 3.33.7.51-.05 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.63.14-.18.28-.72.9-.88 1.09-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.54-.46-.47-.63-.48h-.55Z"
      />
    </svg>
  );
}

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M21.74 4.67c.25-1.13-.64-1.57-1.53-1.2L3.08 10.08c-1.17.46-1.15 1.12-.2 1.41l4.4 1.37 10.2-6.44c.48-.29.92-.13.56.19l-8.27 7.46-.32 4.73c.47 0 .68-.22.94-.47l2.26-2.2 4.7 3.47c.86.48 1.48.23 1.7-.8l2.69-14.13Z"
      />
    </svg>
  );
}

function ContactChoiceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-[28px] border-border p-0 shadow-[0_32px_90px_rgba(26,46,42,0.22)] sm:max-w-[540px]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-axcend-soft blur-3xl" />
        <div className="relative z-10 p-6 md:p-7">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle className="text-2xl font-semibold leading-tight text-foreground">
              Выберите удобный способ связи
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Позвоните нам или напишите в WhatsApp / Telegram. Вы сразу перейдёте в выбранный
              канал.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-3">
            <div className="rounded-[22px] border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-axcend-soft text-axcend-dark">
                  <PhoneOutgoing className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">Позвонить</div>
                  <div className="text-xs text-muted-foreground">Выберите номер для звонка</div>
                </div>
              </div>
              <div className="grid gap-2" data-i18n-ignore="true">
                <a
                  href={`tel:${CONTACT_PHONE_PRIMARY}`}
                  className="rounded-full border border-border bg-muted px-4 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-axcend-action hover:bg-axcend-soft"
                >
                  +7 708 507 73 71
                </a>
              </div>
            </div>

            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-[22px] border border-border bg-background p-4 text-left transition-colors hover:border-axcend-action hover:bg-axcend-soft"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-axcend-soft text-axcend-dark">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    Написать в WhatsApp
                  </span>
                  <span className="block text-xs text-muted-foreground" data-i18n-ignore="true">
                    +7 708 507 7371
                  </span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>

            <a
              href={CONTACT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-[22px] border border-border bg-background p-4 text-left transition-colors hover:border-axcend-action hover:bg-axcend-soft"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-axcend-soft text-axcend-dark">
                  <TelegramIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    Написать в Telegram
                  </span>
                  <span className="block text-xs text-muted-foreground" data-i18n-ignore="true">
                    @otdel_svyazi
                  </span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStoredLanguage() {
  if (typeof window === "undefined") return "ru";
  try {
    return localStorage.getItem("axcend-language") || "ru";
  } catch {
    return "ru";
  }
}

function createLanguageScrollRestorer() {
  const savedY = window.scrollY;
  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--axcend-header-height"),
    ) || 76;
  const viewportLine = Math.min(
    window.innerHeight - 1,
    headerHeight + Math.max(96, Math.min(220, (window.innerHeight - headerHeight) * 0.28)),
  );
  const sectionIds = [
    "why",
    "what",
    "industries",
    "proof",
    "packages",
    "funnel",
    "calc",
    "faq",
    "contact",
  ];
  const visibleSection = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => Boolean(section))
    .map((section) => ({ section, rect: section.getBoundingClientRect() }))
    .find(({ rect }) => rect.top <= viewportLine && rect.bottom >= viewportLine);

  if (!visibleSection) {
    return () => window.scrollTo({ top: savedY, behavior: "auto" });
  }

  const offsetFromSectionTop = viewportLine - visibleSection.rect.top;
  return () => {
    if (!visibleSection.section.isConnected) {
      window.scrollTo({ top: savedY, behavior: "auto" });
      return;
    }

    const nextTop =
      visibleSection.section.getBoundingClientRect().top +
      window.scrollY -
      viewportLine +
      offsetFromSectionTop;
    window.scrollTo({ top: Math.max(0, nextTop), behavior: "auto" });
  };
}

function LanguageSwitcher() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("ru");
  const [languages, setLanguages] = useState<LanguageOption[]>(FALLBACK_LANGUAGES);

  useEffect(() => {
    const syncLanguageState = () => {
      setLanguages(
        window.AXCEND_I18N?.languages ||
          window.AXCEND_I18N_PAYLOAD?.languages ||
          FALLBACK_LANGUAGES,
      );
      setCurrentLanguage(window.AXCEND_I18N?.getLanguage() || getStoredLanguage());
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    syncLanguageState();
    window.addEventListener("axcend-i18n-ready", syncLanguageState);
    window.addEventListener("axcend-language-change", syncLanguageState);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("axcend-i18n-ready", syncLanguageState);
      window.removeEventListener("axcend-language-change", syncLanguageState);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const selectLanguage = (language: string) => {
    const restoreScroll = createLanguageScrollRestorer();
    if (window.AXCEND_I18N) {
      window.AXCEND_I18N.setLanguage(language);
    } else {
      try {
        localStorage.setItem("axcend-language", language);
      } catch {
        /* ignored */
      }
      setCurrentLanguage(language);
    }
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(restoreScroll));
    window.setTimeout(restoreScroll, 120);
    window.setTimeout(restoreScroll, 360);
  };

  return (
    <div
      ref={ref}
      className="axcend-lang-switcher"
      data-i18n-ignore="true"
      data-open={open ? "true" : "false"}
    >
      <div className="axcend-lang-quick" role="group" aria-label="Выбрать язык">
        {QUICK_LANGUAGES.map(([code, label]) => (
          <button
            key={code}
            type="button"
            className="axcend-lang-quick-option"
            aria-current={code === currentLanguage ? "true" : "false"}
            onClick={() => selectLanguage(code)}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        className="axcend-lang-button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((value) => !value)}
      >
        Все
      </button>
      <div className="axcend-lang-menu" role="listbox">
        {languages.map(([code, name, short]) => (
          <button
            key={code}
            type="button"
            className="axcend-lang-option"
            role="option"
            aria-current={code === currentLanguage ? "true" : "false"}
            onClick={() => selectLanguage(code)}
          >
            <span>{name}</span>
            <span className="axcend-lang-code">{short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const headerRef = useRef<HTMLElement>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    const previousScrollRestoration =
      "scrollRestoration" in window.history ? window.history.scrollRestoration : undefined;
    if (previousScrollRestoration !== undefined) {
      window.history.scrollRestoration = "manual";
    }

    const getHashId = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return "";
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    };

    const scrollToHash = () => {
      const id = getHashId();
      if (!id) return;
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--axcend-header-height"),
        ) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    const pendingTimeouts = new Set<number>();

    const clearPendingScrolls = () => {
      pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      pendingTimeouts.clear();
    };

    const scheduleScrollToHash = () => {
      clearPendingScrolls();
      requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
      const delays = getHashId() === "top" ? [120, 450, 900] : [120, 450, 1100, 1900];
      delays.forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          pendingTimeouts.delete(timeoutId);
          scrollToHash();
        }, delay);
        pendingTimeouts.add(timeoutId);
      });
    };

    const handleHashClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const nextHash = href === "#" ? "#top" : href;
      const nextId = nextHash.slice(1);
      if (nextId !== "top" && !document.getElementById(nextId)) return;

      event.preventDefault();
      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      if (window.location.hash === nextHash) {
        scheduleScrollToHash();
        return;
      }

      window.history.pushState(null, "", nextUrl);
      scheduleScrollToHash();
    };

    const cancelPendingOnUserIntent = (event: Event) => {
      if (event.type === "keydown") {
        const key = (event as KeyboardEvent).key;
        if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(key))
          return;
      }
      clearPendingScrolls();
    };

    scheduleScrollToHash();
    window.addEventListener("hashchange", scheduleScrollToHash);
    window.addEventListener("popstate", scheduleScrollToHash);
    window.addEventListener("axcend-i18n-ready", scheduleScrollToHash);
    document.addEventListener("click", handleHashClick);
    window.addEventListener("wheel", cancelPendingOnUserIntent, { passive: true });
    window.addEventListener("touchstart", cancelPendingOnUserIntent, { passive: true });
    window.addEventListener("keydown", cancelPendingOnUserIntent);
    return () => {
      clearPendingScrolls();
      if (previousScrollRestoration !== undefined) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
      window.removeEventListener("hashchange", scheduleScrollToHash);
      window.removeEventListener("popstate", scheduleScrollToHash);
      window.removeEventListener("axcend-i18n-ready", scheduleScrollToHash);
      document.removeEventListener("click", handleHashClick);
      window.removeEventListener("wheel", cancelPendingOnUserIntent);
      window.removeEventListener("touchstart", cancelPendingOnUserIntent);
      window.removeEventListener("keydown", cancelPendingOnUserIntent);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--axcend-header-height",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    };

    syncHeaderHeight();
    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
      document.documentElement.style.removeProperty("--axcend-header-height");
    };
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-background text-foreground"
      style={{ paddingTop: "var(--axcend-header-height, 76px)" }}
    >
      <ContactChoiceDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />

      {/* Nav */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-x-4 gap-y-2 px-6 py-4 md:py-5">
          <a href="#" className="text-base font-semibold tracking-tight">
            AXCEND
          </a>
          <div
            className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-sm text-muted-foreground md:flex"
            data-i18n-ignore="true"
          >
            <span className="truncate">ТОО «RETRAND» · БИН 241140036858.</span>
            <span className="flex shrink-0 items-center gap-2">
              <a
                href="https://wa.me/77085077371"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-axcend-action hover:bg-axcend-soft hover:text-axcend-dark"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/otdel_svyazi"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                title="Telegram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-axcend-action hover:bg-axcend-soft hover:text-axcend-dark"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
            </span>
          </div>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setContactDialogOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-axcend-action px-4 py-2 text-sm font-medium text-axcend-dark transition-opacity hover:opacity-90"
          >
            Обсудить задачу
          </button>
        </nav>
      </header>

      {/* Countries Banner */}
      <section className="border-b border-axcend-soft bg-axcend-soft">
        <div className="mx-auto max-w-6xl px-6 py-2.5 md:py-4">
          <div className="flex w-full min-w-0 flex-nowrap items-center justify-start gap-x-3 overflow-x-auto overflow-y-hidden md:justify-center md:overflow-hidden md:gap-x-4">
            <span className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
              Рынки присутствия
            </span>
            {[
              { flag: "/flags/kz.svg", name: "Казахстан" },
              { flag: "/flags/uz.svg", name: "Узбекистан" },
              { flag: "/flags/kr.svg", name: "Южная Корея" },
              { flag: "/flags/tr.svg", name: "Турция" },
              { flag: "/flags/am.svg", name: "Армения" },
              { flag: "/flags/kg.svg", name: "Кыргызстан" },
              { flag: "/flags/ge.svg", name: "Грузия" },
              { flag: "/flags/az.svg", name: "Азербайджан" },
              { flag: "/flags/ae.svg", name: "ОАЭ" },
            ].map((c) => (
              <div key={c.name} className="flex shrink-0 items-center gap-1.5">
                <img
                  src={c.flag}
                  alt={c.name}
                  className="h-3.5 w-5 rounded-[2px] object-contain shadow-sm"
                />
                <span className="text-xs font-medium text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-axcend-dark text-white">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-white md:text-6xl">
                Внешний отдел B2B&#8209;продаж
                <br className="hidden md:block" /> Центральная Азия
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим
                на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setContactDialogOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-axcend-action px-6 py-3 text-sm font-medium text-axcend-dark shadow-[0_14px_34px_rgba(200,240,160,0.20)] transition-opacity hover:opacity-90"
                >
                  Обсудить задачу <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 grid grid-cols-2 items-start gap-4 py-4 sm:grid-cols-4">
                {[
                  { value: "170+", label: "компаниям помогли", Icon: Briefcase },
                  { value: "50 000+", label: "B2B-диалогов в месяц", Icon: MessagesSquare },
                  { value: "11+", label: "языков продаж", Icon: Languages },
                  { value: "84+", label: "менеджеров в команде", Icon: Users },
                ].map(({ value, label, Icon }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-axcend-action/15 text-axcend-action">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-white">{value}</div>
                      <div className="text-xs text-white/70">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Why high conversion — centerpiece */}
      <section id="why" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Почему AXCEND
            </div>
            <h2 className="text-3xl font-semibold leading-[1.12] md:text-5xl">
              <span>32%</span> средний процент конверсии
            </h2>
          </div>

          <div className="mt-16">
            <ConversionSystem items={conversionReasons} />
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <div className="relative overflow-hidden bg-axcend-dark [&_h2]:!font-sans [&_h2]:!text-3xl [&_h2]:!font-semibold [&_h2]:!leading-[1.15] [&_h2]:!tracking-normal [&_h2]:!text-primary-foreground md:[&_h2]:!text-5xl [&_.text-muted-foreground]:!text-primary-foreground [&_section>div]:!py-12 md:[&_section>div]:!py-16 [&_.mt-14]:!mt-0 md:[&_.md\:mt-20]:!mt-0">
        <div className="pointer-events-none absolute -right-[18%] -top-40 hidden h-[30rem] w-[70rem] rounded-full bg-[radial-gradient(ellipse_at_62%_32%,rgba(200,240,160,0.22)_0%,rgba(200,240,160,0.12)_36%,rgba(200,240,160,0.05)_62%,rgba(200,240,160,0)_84%)] blur-[72px] md:block" />
        <Section eyebrow="Гарантия" title="Гарантия от 5% закрепляется в договоре" center>
          <></>
        </Section>
      </div>

      {/* What we do */}
      <Section id="what" eyebrow="Что вы получаете" title="Работая с AXCEND" center>
        <WhatWeDoTabs />
      </Section>

      {/* Industries & conversion */}
      <Section id="industries" eyebrow="Отрасли и конверсии" title="Результаты AXEND" center>
        <IndustriesShowcase />
      </Section>

      {/* Proof block */}
      <Section id="proof" eyebrow="принципы работы" title="Что отличает AXCEND" center>
        <ProofGrid items={proofs} />
      </Section>

      {/* Packages — scenarios */}
      <Section
        id="packages"
        eyebrow="Пакеты-сценарии"
        title="Готовые сценарии под вашу задачу"
        center
      >
        <PackagesSelector />
      </Section>

      {/* Calculator */}
      <Section
        id="calc"
        eyebrow="Калькулятор результата"
        title="Оцените потенциал внешнего отдела продаж"
        center
      >
        <Calculator />
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Частые вопросы" center>
        <FAQ />
      </Section>

      {/* CTA */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-primary-foreground/10 bg-axcend-dark text-primary-foreground"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-72 bottom-[-22rem] h-[56rem] w-[64rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,240,160,0.14)_0%,rgba(200,240,160,0.072)_30%,rgba(200,240,160,0.03)_52%,rgba(200,240,160,0.01)_70%,rgba(200,240,160,0)_88%)] blur-[104px]"
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-20 md:gap-12 md:py-32 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-primary-foreground md:text-5xl">
              Подключите AXEND для увеличения продаж
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              Расскажите о продукте и целевом рынке — мы покажем, какой результат реалистично
              получить и как будет устроена работа.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              <a
                href="mailto:axcend.kz@retrand.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-axcend-action px-6 py-3 text-sm font-medium text-axcend-dark shadow-[0_14px_34px_rgba(200,240,160,0.18)] transition-opacity hover:opacity-90 sm:w-auto"
              >
                Написать в AXCEND <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-primary-foreground/15 pt-7 md:pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/55">
              Контакты
            </div>
            <div
              className="mt-5 grid gap-2.5 text-[15px] font-medium text-primary-foreground md:mt-6 md:gap-3 md:text-base"
              data-i18n-ignore="true"
            >
              <a
                className="transition-colors hover:text-axcend-action"
                href="mailto:axcend.kz@retrand.com"
              >
                axcend.kz@retrand.com
              </a>
              <a
                className="transition-colors hover:text-axcend-action"
                href="mailto:retrand.plus@gmail.com"
              >
                retrand.plus@gmail.com
              </a>
              <a className="transition-colors hover:text-axcend-action" href="tel:+77085077371">
                +7 708 507 73 71
              </a>
              <a className="transition-colors hover:text-axcend-action" href="tel:+77714976731">
                +7 771 497 67 31
              </a>
              <a className="transition-colors hover:text-axcend-action" href="tel:+77004592902">
                +7 700 459 29 02
              </a>
            </div>
            <div className="mt-7 flex items-center gap-3 md:mt-8" data-i18n-ignore="true">
              <a
                href="https://wa.me/77085077371"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] text-primary-foreground transition-colors hover:border-axcend-action hover:bg-axcend-action hover:text-axcend-dark"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/otdel_svyazi"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                title="Telegram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] text-primary-foreground transition-colors hover:border-axcend-action hover:bg-axcend-action hover:text-axcend-dark"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} AXCEND</div>
          <div>Внешний отдел B2B-продаж · СНГ</div>
        </div>
      </footer>
    </div>
  );
}
