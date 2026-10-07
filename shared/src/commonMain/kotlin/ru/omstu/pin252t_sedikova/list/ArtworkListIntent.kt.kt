package ru.omstu.pin252t_sedikova.list
// Пользовательские сценарии
sealed interface ArtworkListIntent {
    // Пользователь вводит текст в поиск
    data class Search(val query: String) : ArtworkListIntent
    // Пользователь очистил поиск
    data object ClearSearch : ArtworkListIntent
}