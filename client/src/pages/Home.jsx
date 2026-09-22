import React from 'react'
import Header from '../components/nav/Header'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Products from '../components/home/Products'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Reviews from '../components/home/Reviews'
import Faqs from '../components/home/Faqs'
import Order from '../components/home/Order'
import Footer from '../components/nav/Footer'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Products />
        <WhyChooseUs />
        <Reviews />
        <Faqs />
        <Order />
      </main>
      <Footer />
    </>
  )
}

export default Home