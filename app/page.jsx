"use client"
import { useEffect, useRef, useState } from "react"

export default function AquamarePage() {
  const [isVisible, setIsVisible] = useState({})
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const observerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const video = videoRef.current
    if (video) {
      const handleTimeUpdate = () => {
        if (video.duration - video.currentTime < 0.1) {
          video.currentTime = 0
        }
      }
      video.addEventListener("timeupdate", handleTimeUpdate)
      return () => {
        observerRef.current?.disconnect()
        window.removeEventListener("scroll", handleScroll)
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-primary transition-transform duration-300 hover:scale-105">
              ONE Water
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a
                href="#sobre"
                onClick={(e) => handleNavClick(e, '#sobre')}
                className="text-sm lg:text-base hover:text-primary transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap"
              >
                Sobre
              </a>
              <a
                href="#beneficios"
                onClick={(e) => handleNavClick(e, '#beneficios')}
                className="text-sm lg:text-base hover:text-primary transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap"
              >
                Benefícios
              </a>
              <a
                href="#processo"
                onClick={(e) => handleNavClick(e, '#processo')}
                className="text-sm lg:text-base hover:text-primary transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap"
              >
                Processo
              </a>
              <a
                href="#produtos"
                onClick={(e) => handleNavClick(e, '#produtos')}
                className="text-sm lg:text-base hover:text-primary transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap"
              >
                Produtos
              </a>
              <a
                href="#contato"
                onClick={(e) => handleNavClick(e, '#contato')}
                className="text-sm lg:text-base hover:text-primary transition-all duration-300 hover:translate-y-[-2px] whitespace-nowrap"
              >
                Contato
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground transition-transform duration-300 hover:scale-110 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-3 py-4 border-t border-border">
              <a
                href="#sobre"
                onClick={(e) => handleNavClick(e, '#sobre')}
                className="text-base hover:text-primary transition-all duration-300 py-2 px-4 hover:bg-primary/10 rounded-md"
              >
                Sobre
              </a>
              <a
                href="#beneficios"
                onClick={(e) => handleNavClick(e, '#beneficios')}
                className="text-base hover:text-primary transition-all duration-300 py-2 px-4 hover:bg-primary/10 rounded-md"
              >
                Benefícios
              </a>
              <a
                href="#processo"
                onClick={(e) => handleNavClick(e, '#processo')}
                className="text-base hover:text-primary transition-all duration-300 py-2 px-4 hover:bg-primary/10 rounded-md"
              >
                Processo
              </a>
              <a
                href="#produtos"
                onClick={(e) => handleNavClick(e, '#produtos')}
                className="text-base hover:text-primary transition-all duration-300 py-2 px-4 hover:bg-primary/10 rounded-md"
              >
                Produtos
              </a>
              <a
                href="#contato"
                onClick={(e) => handleNavClick(e, '#contato')}
                className="text-base hover:text-primary transition-all duration-300 py-2 px-4 hover:bg-primary/10 rounded-md"
              >
                Contato
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="agua-mexendo.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance animate-slide-up">
            DO MAR PARA A GARRAFA
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-balance leading-relaxed animate-slide-up animation-delay-200">
            Um novo conceito em água.
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-pretty leading-relaxed opacity-90 animate-slide-up animation-delay-400">
            Água purificada do oceano, enriquecida com mais de 63 minerais naturais através de nanotecnologia avançada e
            princípios de thalassoterapia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <a
              href="#produtos"
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Descubra Nossos Produtos
            </a>
            <a
              href="#sobre"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Conheça a Tecnologia
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div
            id="about-content"
            data-animate
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible["about-content"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-balance">Pioneirismo e Inovação</h2>
            <div className="prose prose-lg max-w-none text-pretty leading-relaxed">
              <p className="text-lg mb-6">
                A <strong>One</strong> é uma empresa 100% brasileira, pioneira no desenvolvimento de tecnologias
                revolucionárias no segmento de produtos saudáveis. Nossa missão é proporcionar bem-estar excepcional e
                qualidade de vida superior através da inovação científica.
              </p>
              <p className="text-lg mb-6">
                Após 12 anos de pesquisas intensivas e investimentos estratégicos dedicados ao controle preciso de
                minerais em água dessalinizada, desenvolvemos uma tecnologia avançada e exclusiva para a purificação da
                água do mar. Nosso processo utiliza o princípio da nanotecnologia de última geração, associado ao
                conceito milenar de thalassoterapia.
              </p>
              <p className="text-lg">
                Esta tecnologia inovadora estabelece um novo paradigma para o segmento de água potável e produtos
                saudáveis, posicionando a One como referência em inovação e excelência no mercado nacional e
                internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div
              id="mission-card-1"
              data-animate
              className={`bg-card p-8 rounded-xl shadow-sm transition-all duration-1000 hover:shadow-lg hover:scale-105 ${
                isVisible["mission-card-1"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Nossa Missão</h3>
              <p className="text-pretty leading-relaxed">
                Ser a empresa de referência absoluta no desenvolvimento de produtos saudáveis, oferecendo benefícios
                incomparáveis à saúde e ao bem-estar de nossos consumidores. Comprometemo-nos com credibilidade
                inabalável, padrão de qualidade excepcional, tecnologia inovadora de ponta e segurança total em cada
                produto.
              </p>
            </div>
            <div
              id="mission-card-2"
              data-animate
              className={`bg-card p-8 rounded-xl shadow-sm transition-all duration-1000 delay-200 hover:shadow-lg hover:scale-105 ${
                isVisible["mission-card-2"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Compromisso Socioambiental</h3>
              <p className="text-pretty leading-relaxed">
                A One defende e pratica ativamente o conceito de responsabilidade socioambiental, estimulando o
                respeito profundo ao meio ambiente e valorizando iniciativas ligadas à qualidade de vida sustentável.
                Conscientes de nosso compromisso com o planeta, investimos continuamente em tecnologias e práticas
                sustentáveis, utilizando insumos 100% recicláveis e processos que não exploram recursos hídricos de água
                doce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ocean Benefits Section */}
      <section id="beneficios" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              id="benefits-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-center text-balance transition-all duration-1000 ${
                isVisible["benefits-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              O Oceano e Suas Riquezas Naturais
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16 overflow-hidden">
              <div
                id="ocean-image"
                data-animate
                className={`transition-all duration-1000 ${
                  isVisible["ocean-image"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <img
                  src="/bixo-na-agua.jpg"
                  alt="Vida marinha"
                  className="rounded-xl shadow-lg w-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                id="ocean-text"
                data-animate
                className={`transition-all duration-1000 delay-300 ${
                  isVisible["ocean-text"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <p className="text-lg mb-6 text-pretty leading-relaxed">
                  Para cientistas e pesquisadores renomados mundialmente, o oceano é considerado o berço primordial de
                  toda a vida na Terra. A água marinha contém naturalmente pelo menos{" "}
                  <strong>86 minerais essenciais</strong> e uma diversidade extraordinária de nutrientes, criando um
                  ecossistema único e propício para a imensa biodiversidade encontrada neste sistema complexo e
                  fascinante.
                </p>
              </div>
            </div>

            {/* Thalassotherapy */}
            <div
              id="thalasso-card"
              data-animate
              className={`bg-primary text-primary-foreground p-8 md:p-12 rounded-xl transition-all duration-1000 hover:shadow-2xl ${
                isVisible["thalasso-card"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-3xl font-bold mb-6 text-balance">THALASSOTERAPIA — O Oceano Como Fonte de Cura</h3>
              <p className="text-lg mb-6 text-pretty leading-relaxed">
                Os benefícios terapêuticos das águas marinhas são aplicados há milênios em tratamentos como a
                Thalassoterapia, termo derivado do grego "Thalasso" (mar) e "Therapia" (cura). Este método natural,
                conhecido e reverenciado desde a Antiguidade, foi utilizado por civilizações gregas e romanas para
                diversos tratamentos medicinais e de bem-estar.
              </p>
              <p className="text-lg text-pretty leading-relaxed">
                A terapia consiste em utilizar as virtudes curativas excepcionais dos elementos marinhos para
                reequilibrar o organismo vivo de forma holística: estimulando a eliminação eficiente de toxinas,
                reestruturando o sistema celular, favorecendo a metabolização de gorduras e promovendo a hidratação
                profunda da pele através da ação benéfica das algas e minerais marinhos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One Product Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2
              id="aqua-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-8 text-balance transition-all duration-1000 ${
                isVisible["aqua-title"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              One - Água super premium
            </h2>
            <div
              id="aqua-card"
              data-animate
              className={`bg-card p-8 md:p-12 rounded-xl shadow-lg mb-12 transition-all duration-1000 hover:shadow-2xl ${
                isVisible["aqua-card"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xl mb-6 text-pretty leading-relaxed">
                A <strong>One</strong> representa uma revolução no conceito de hidratação premium. Trata-se de uma
                água extraordinariamente rica em oligoelementos essenciais que o corpo humano necessita em doses
                precisas diárias, incluindo ferro, cobalto, lítio, manganês, selênio, zinco, fósforo e vanádio, entre
                muitos outros.
              </p>
              <p className="text-lg mb-6 text-pretty leading-relaxed">
                Com o objetivo de preservar integralmente as propriedades benéficas das águas marinhas e auxiliar o
                organismo na missão vital de manter-se equilibrado e saudável, a fórmula exclusiva da One conseguiu
                manter mais de 60 destes minerais preciosos em estrutura de oligoelementos — ou seja, em concentrações
                inferiores a 0,002 mg/L — através do princípio revolucionário da nanotecnologia associado ao conceito
                milenar de thalassoterapia.
              </p>
              <div className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg text-2xl font-bold hover:scale-110 transition-transform duration-300">
                DIFERENCIAL EXCLUSIVO: 63 Minerais Naturais
              </div>
            </div>
            <p className="text-lg text-muted-foreground text-pretty">
              A diversidade excepcional e a quantidade precisa destes oligoelementos representam o grande diferencial
              competitivo entre a One e as demais águas disponíveis no mercado, que oferecem, em média, apenas 12
              minerais.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              id="process-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-center text-balance transition-all duration-1000 ${
                isVisible["process-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Processo de Purificação Avançada
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  id: "process-1",
                  number: 1,
                  title: "Captação Estratégica",
                  text: "Água captada em alto-mar, a mais de 20 km da costa e profundidade superior a 30 metros, garantindo pureza excepcional.",
                },
                {
                  id: "process-2",
                  number: 2,
                  title: "Purificação Nanotecnológica",
                  text: "Todos os sais e impurezas são meticulosamente removidos, preservando exclusivamente os minerais e nutrientes essenciais.",
                },
                {
                  id: "process-3",
                  number: 3,
                  title: "Qualidade Internacional",
                  text: "Água com qualidade premium de consumo, rigorosamente dentro dos padrões internacionais exigidos pela OMS.",
                },
              ].map((step, index) => (
                <div
                  key={step.id}
                  id={step.id}
                  data-animate
                  className={`bg-card p-6 rounded-xl text-center transition-all duration-1000 hover:shadow-lg hover:scale-105 ${
                    isVisible[step.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover:rotate-360 transition-transform duration-700">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-pretty leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div
              id="process-info"
              data-animate
              className={`bg-card p-8 rounded-xl transition-all duration-1000 ${
                isVisible["process-info"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-lg mb-4 text-pretty leading-relaxed">
                Nenhum tipo de substância química é adicionado durante o processo de purificação. O resultado é uma água
                com qualidade premium de consumo, rigorosamente dentro dos padrões internacionais mais exigentes
                estabelecidos pela Organização Mundial da Saúde (OMS).
              </p>
              <p className="text-lg text-pretty leading-relaxed">
                A água é purificada e processada em nossa usina de tratamento própria e exclusiva, estrategicamente
                localizada em <strong>Bertioga, litoral norte de São Paulo</strong>, garantindo controle total de
                qualidade em todas as etapas do processo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Composition Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto overflow-hidden">
            <h2
              id="composition-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-center text-balance transition-all duration-1000 ${
                isVisible["composition-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Composição Físico-Química Premium
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div
                id="composition-card-1"
                data-animate
                className={`bg-card p-8 rounded-xl border border-border transition-all duration-1000 hover:shadow-lg hover:scale-105 ${
                  isVisible["composition-card-1"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Características Nutricionais</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Bicarbonato de Sódio:", value: "37 mg/L" },
                    { label: "Sódio:", value: "28 mg/L" },
                    { label: "Cloretos:", value: "0,74 mg/L" },
                    { label: "Sulfatos:", value: "0,12 mg/L" },
                    { label: "pH:", value: "7,9" },
                    { label: "Dureza Total:", value: "0,56 mg/L" },
                    { label: "Sólidos Totais:", value: "105 mg/L" },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between hover:translate-x-2 transition-transform duration-300"
                    >
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                id="composition-card-2"
                data-animate
                className={`bg-card p-8 rounded-xl border border-border transition-all duration-1000 hover:shadow-lg hover:scale-105 ${
                  isVisible["composition-card-2"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Análise Microbiológica</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between hover:translate-x-2 transition-transform duration-300">
                    <span>Coliformes Totais (em 100ml):</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Ausente
                    </span>
                  </li>
                  <li className="flex justify-between hover:translate-x-2 transition-transform duration-300">
                    <span>Escherichia coli (em 100ml):</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Ausente
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Minerals List */}
            <div
              id="minerals-card"
              data-animate
              className={`bg-primary text-primary-foreground p-8 md:p-12 rounded-xl transition-all duration-1000 ${
                isVisible["minerals-card"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <h3 className="text-3xl font-bold mb-8 text-center">Minerais Naturais Presentes na One</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                {[
                  "Cálcio",
                  "Magnésio",
                  "Potássio",
                  "Sódio",
                  "Sulfato",
                  "Silício",
                  "Alumínio",
                  "Fósforo",
                  "Cobre",
                  "Zinco",
                  "Manganês",
                  "Ferro",
                  "Vanádio",
                  "Molibdênio",
                  "Chumbo",
                  "Antimônio",
                  "Lutécio",
                  "Neodímio",
                  "Praseodímio",
                  "Samário",
                  "Escândio",
                  "Térbio",
                  "Tório",
                  "Túlio",
                  "Ítrio",
                  "Itérbio",
                  "Boro",
                  "Germânio",
                  "Rênio",
                  "Tantálio",
                  "Tungstênio",
                  "Zircônio",
                  "Berílio",
                  "Tálio",
                  "Titânio",
                  "Cromo",
                  "Níquel",
                  "Cobalto",
                  "Arsênio",
                  "Selênio",
                  "Carbono",
                  "Cério",
                  "Disprósio",
                  "Érbio",
                  "Európio",
                  "Gadolínio",
                  "Hólmio",
                  "Lantânio",
                  "Ouro",
                  "Irídio",
                  "Paládio",
                  "Platina",
                  "Ródio",
                  "Rutênio",
                  "Estanho",
                  "Telúrio",
                  "Háfnio",
                  "Índio",
                  "Urânio",
                  "Nióbio",
                  "Estrôncio",
                  "Bário",
                  "Cádmio",
                ].map((mineral, index) => (
                  <div
                    key={mineral}
                    className="py-2 px-3 bg-primary-foreground/10 rounded-lg text-sm hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300"
                    style={{ animationDelay: `${index * 20}ms` }}
                  >
                    {mineral}
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-sm opacity-90">
                Todos os oligoelementos relacionados estão presentes em frações inferiores a 0,002 mg/L, rigorosamente
                dentro dos padrões internacionais estabelecidos pela OMS — Organização Mundial da Saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              id="cert-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-center text-balance transition-all duration-1000 ${
                isVisible["cert-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Certificações e Padrões Internacionais
            </h2>
            <div
              id="cert-card"
              data-animate
              className={`bg-card p-8 md:p-12 rounded-xl space-y-6 transition-all duration-1000 ${
                isVisible["cert-card"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {[
                "Produzida e envasada rigorosamente dentro dos mais altos padrões de qualidade determinados pelos organismos industriais e ambientais internacionais.",
                "Em total conformidade com os critérios de potabilidade exigidos por todas as legislações de controle de água no mundo.",
                "AWWA - APHA - WPCI — Standard Methods for the Examination of Water and Wastewater: Certificação internacional de excelência.",
                "Lei 9.433/1997 — Captação da água em total conformidade com a legislação ambiental brasileira.",
                "Portaria n. 518 do Ministério da Saúde — Controle e Vigilância da Qualidade de Água para o Consumo Humano e Padrão de Potabilidade.",
                "FDA — Food and Drug Administration: Certificação internacional do rigoroso órgão norte-americano, reconhecida em 81 países.",
                "ANVISA — Água Adicionada de Sais: Em total conformidade com a RDC 274 de 22/09/2005.",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1 hover:rotate-360 transition-transform duration-700">
                    ✓
                  </div>
                  <p className="text-pretty leading-relaxed">
                    {text.includes("AWWA") ||
                    text.includes("Lei") ||
                    text.includes("Portaria") ||
                    text.includes("FDA") ||
                    text.includes("ANVISA") ? (
                      <>
                        <strong>{text.split(" — ")[0]}</strong>
                        {text.includes(" — ") && ` — ${text.split(" — ").slice(1).join(" — ")}`}
                      </>
                    ) : (
                      text
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              id="products-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-center text-balance transition-all duration-1000 ${
                isVisible["products-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Linha Premium de Produtos
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  id: "product-1",
                  image: "/water-bottle-1-5-liter-premium.jpg",
                  title: "Pet 1,5 Litros",
                  pack: "Pack com 6 unidades",
                  size: "17,5 × 26,7 × 33,1 cm",
                  weight: "9,66 kg",
                },
                {
                  id: "product-2",
                  image: "/water-bottle-500ml-premium.jpg",
                  title: "Pet 500 ml",
                  pack: "Pack com 12 unidades",
                  size: "20,2 × 27,1 × 22,6 cm",
                  weight: "6,6 kg",
                },
                {
                  id: "product-3",
                  image: "/water-cup-310ml-premium.jpg",
                  title: "Copo 310 ml",
                  pack: "Caixa com 24 unidades",
                  size: "46,7 × 32,0 × 14,2 cm",
                  weight: "7,8 kg",
                },
                {
                  id: "product-4",
                  image: "/water-cup-200ml-premium.jpg",
                  title: "Copo 200 ml",
                  pack: "Caixa com 24 unidades",
                  size: "46,2 × 31,2 × 10,0 cm",
                  weight: "5,5 kg",
                },
              ].map((product, index) => (
                <div
                  key={product.id}
                  id={product.id}
                  data-animate
                  className={`bg-card p-6 rounded-xl border border-border hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                    isVisible[product.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden group">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{product.pack}</p>
                    <p>Dimensões: {product.size}</p>
                    <p>Peso: {product.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        data-animate
        className={`py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground transition-all duration-1000 ${
          isVisible["cta-section"] ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-pulse-slow">
            Experimente a Excelência da One
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubra a diferença incomparável de uma água premium enriquecida com mais de 63 minerais naturais do
            oceano.
          </p>
          <a
            href="#contato"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          >
            Solicite Informações
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="contact-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold mb-12 text-balance transition-all duration-1000 ${
                isVisible["contact-title"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Entre em Contato
            </h2>
            <div
              id="contact-card"
              data-animate
              className={`bg-card p-8 md:p-12 rounded-xl border border-border hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                isVisible["contact-card"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6">One Beneficiadora e Distribuidora de Água Ltda.</h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-center justify-center gap-3 hover:translate-x-2 transition-transform duration-300">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+55 (11) 3873-2968</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ONE Water</h3>
              <p className="text-sm opacity-90 text-pretty">
                Água premium purificada do oceano, enriquecida com mais de 63 minerais naturais.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                {["Sobre", "Benefícios", "Processo", "Produtos", "Contato"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:opacity-80 hover:translate-x-2 inline-block transition-all duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Certificações Internacionais</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="hover:translate-x-2 transition-transform duration-300">
                  FDA — Food and Drug Administration
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  ANVISA — Agência Nacional de Vigilância Sanitária
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  OMS — Organização Mundial da Saúde
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>
              © {new Date().getFullYear()} One Beneficiadora e Distribuidora de Água Ltda. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
