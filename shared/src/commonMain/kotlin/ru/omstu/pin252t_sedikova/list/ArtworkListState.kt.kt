package ru.omstu.pin252t_sedikova.list

import ru.omstu.pin252t_sedikova.data.Artwork

data class ArtworkListState(
    val artworks: List<Artwork> = emptyList(),
    val searchQuery: String = ""
)

