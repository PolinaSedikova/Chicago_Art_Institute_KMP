package ru.omstu.pin252t_sedikova.list

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import ru.omstu.pin252t_sedikova.data.mockArtworks

class ArtworkListViewModel {

    private val _state = MutableStateFlow(ArtworkListState())

    val state: StateFlow<ArtworkListState> = _state.asStateFlow()

    init {
        _state.value = _state.value.copy(artworks = mockArtworks)
    }

    fun onIntent(intent: ArtworkListIntent) {
        when (intent) {
            is ArtworkListIntent.Search -> {
                // Поиск картины
                val filtered = mockArtworks.filter {
                    it.title.contains(intent.query, ignoreCase = true) ||
                            it.artistDisplay.contains(intent.query, ignoreCase = true)
                }
                _state.value = _state.value.copy(
                    artworks = filtered,
                    searchQuery = intent.query
                )
            }
            is ArtworkListIntent.ClearSearch -> {
                // Сброс поиска и показ всего списка
                _state.value = _state.value.copy(
                    artworks = mockArtworks,
                    searchQuery = ""
                )
            }
        }
    }
}