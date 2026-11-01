package com.safeme.app

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class NetworkState(
    val isOnline: Boolean = true,
    val networkType: String = "Wi-Fi",
    val downlinkSpeedMbps: Int = 25,
    val signalStrength: String = "Excellent"
)

class NetworkMonitor(private val context: Context) {
    private val _networkState = MutableStateFlow(NetworkState())
    val networkState: StateFlow<NetworkState> = _networkState.asStateFlow()

    private val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    private val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            updateNetworkCapabilities(network)
        }

        override fun onCapabilitiesChanged(network: Network, caps: NetworkCapabilities) {
            updateNetworkCapabilities(network, caps)
        }

        override fun onLost(network: Network) {
            _networkState.value = NetworkState(
                isOnline = false,
                networkType = "Offline",
                downlinkSpeedMbps = 0,
                signalStrength = "No Signal"
            )
        }
    }

    private fun updateNetworkCapabilities(network: Network, caps: NetworkCapabilities? = connectivityManager.getNetworkCapabilities(network)) {
        if (caps == null) return

        val isWifi = caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
        val isCellular = caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)
        val isEthernet = caps.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)

        val typeStr = when {
            isWifi -> "Wi-Fi"
            isCellular -> "Cellular 4G/5G"
            isEthernet -> "Ethernet"
            else -> "Connected"
        }

        val downBps = caps.linkDownstreamBandwidthKbps
        val speedMbps = if (downBps > 0) downBps / 1000 else 15

        val signal = if (speedMbps > 20) "Excellent" else if (speedMbps > 5) "Good" else "Fair"

        _networkState.value = NetworkState(
            isOnline = true,
            networkType = typeStr,
            downlinkSpeedMbps = speedMbps,
            signalStrength = signal
        )
    }

    fun startMonitoring() {
        val request = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()
        connectivityManager.registerNetworkCallback(request, networkCallback)

        // Initial check
        val activeNet = connectivityManager.activeNetwork
        if (activeNet != null) {
            updateNetworkCapabilities(activeNet)
        } else {
            _networkState.value = NetworkState(isOnline = false, networkType = "Offline", downlinkSpeedMbps = 0, signalStrength = "No Signal")
        }
    }

    fun stopMonitoring() {
        try {
            connectivityManager.unregisterNetworkCallback(networkCallback)
        } catch (_: Exception) {}
    }
}
