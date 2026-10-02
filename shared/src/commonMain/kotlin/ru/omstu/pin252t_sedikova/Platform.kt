package ru.omstu.pin252t_sedikova

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform