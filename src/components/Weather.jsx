import React, { useEffect, useState } from "react"
import sun from "../images/sun.png"
import cloud from "../images/cloud.png"
import axios from "axios"
import { motion } from "framer-motion"

const Weather = () => {
  const url = import.meta.env.VITE_URI
  const [results, setResults] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const response = await axios.get(url)
      setResults(response.data)
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) {
    return (
      <div
        className="text-center flex justify-center items-center min-h-screen w-full text-4xl text-white "
        style={{ backgroundColor: "#6392c8" }}
      >
        Loading ...
      </div>
    )
  }
  return (
    <div
      className="bg-gray-800 text-white min-h-screen w-full flex justify-center items-center flex-col gap-5"
      style={{ backgroundColor: "#6392c8" }}
    >
      <motion.img
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 4,
        }}
        src={cloud}
        alt=""
        className="w-[300px] absolute top-[33%]"
      />
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          type: "spring",
          ease: "easeInOut",
        }}
        src={sun}
        alt=""
        className="w-[300px]"
      />
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-center">{results.name}</h1>
        {results.main ? (
          <>
            <motion.h1
              initial={{ x: -500, opacity: 0, rotate: -180 }}
              animate={{ x: 0, opacity: 1, rotate: 360 }}
              transition={{
                delay: 2,
                duration: 3,
                type: "spring",
                ease: "easeInOut",
              }}
              className="text-6xl"
            >
              {Math.round(results.main.temp)}&deg;C
            </motion.h1>
            <p>{results.weather[0].main}</p>
          </>
        ) : (
          <h1>Loading</h1>
        )}

        <div className="flex justify-center items-center gap-10 text-center">
          <div>
            {results.main ? (
              <h1>{results.main.humidity}%</h1>
            ) : (
              <h1>Loading</h1>
            )}

            <p>Humidity</p>
          </div>
          <div>
            {results.wind ? (
              <h1>{Math.round(results.wind.speed)} km/h</h1>
            ) : (
              <h1>Loading</h1>
            )}

            <p>wind speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
