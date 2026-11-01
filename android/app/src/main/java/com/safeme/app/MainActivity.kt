package com.safeme.app

import android.os.Bundle
import android.os.Environment
import android.os.StatFs
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

class MainActivity : ComponentActivity() {
    private lateinit var batteryMonitor: BatteryMonitor
    private lateinit var networkMonitor: NetworkMonitor
    private lateinit var appListManager: AppListManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        batteryMonitor = BatteryMonitor(this)
        networkMonitor = NetworkMonitor(this)
        appListManager = AppListManager(this)

        batteryMonitor.startMonitoring()
        networkMonitor.startMonitoring()

        setContent {
            HawaldarAppTheme(
                batteryMonitor = batteryMonitor,
                networkMonitor = networkMonitor,
                appListManager = appListManager
            )
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        batteryMonitor.stopMonitoring()
        networkMonitor.stopMonitoring()
    }
}

@Composable
fun HawaldarAppTheme(
    batteryMonitor: BatteryMonitor,
    networkMonitor: NetworkMonitor,
    appListManager: AppListManager
) {
    val batteryState by batteryMonitor.batteryState.collectAsState()
    val networkState by networkMonitor.networkState.collectAsState()

    var apps by remember { mutableStateOf<List<AppModel>>(emptyList()) }
    var activeTab by remember { mutableStateOf("installed") } // "installed" or "system"
    var isFocusActive by remember { mutableStateOf(false) }
    var storageUsedGb by remember { mutableStateOf(0) }
    var storageTotalGb by remember { mutableStateOf(128) }

    LaunchedEffect(Unit) {
        withContext(Dispatchers.IO) {
            apps = appListManager.getInstalledApps()
            try {
                val stat = StatFs(Environment.getDataDirectory().path)
                val totalBytes = stat.blockCountLong * stat.blockSizeLong
                val freeBytes = stat.availableBlocksLong * stat.blockSizeLong
                val usedBytes = totalBytes - freeBytes
                storageTotalGb = (totalBytes / (1024 * 1024 * 1024)).toInt().coerceAtLeast(64)
                storageUsedGb = (usedBytes / (1024 * 1024 * 1024)).toInt().coerceAtLeast(10)
            } catch (_: Exception) {}
        }
    }

    val filteredApps = apps.filter { it.category == activeTab }
    val activeCount = filteredApps.count { it.isRunning }
    val totalCount = filteredApps.size

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = Color(0xFF120D08)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        listOf(Color(0xFF2C1B06), Color(0xFF120D08), Color(0xFF090604))
                    )
                )
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Hawaldar",
                            fontSize = 22.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = "Security & Device Sentinel",
                            fontSize = 10.sp,
                            fontFamily = FontFamily.Monospace,
                            color = Color(0xFFE89F1F)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        // Battery Capsule
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Color.Black.copy(alpha = 0.5f),
                            border = BorderStroke(1.dp, Color(0xFFE89F1F).copy(alpha = 0.4f))
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(
                                    imageVector = if (batteryState.isCharging) Icons.Default.FlashOn else Icons.Default.BatteryFull,
                                    contentDescription = null,
                                    tint = if (batteryState.isCharging) Color(0xFF4ADE80) else Color(0xFF38BDF8),
                                    modifier = Modifier.size(16.dp)
                                )
                                Text(
                                    text = "${batteryState.level}%",
                                    fontSize = 12.sp,
                                    fontFamily = FontFamily.Monospace,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }
                        }

                        // Network Capsule
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Color.Black.copy(alpha = 0.5f),
                            border = BorderStroke(1.dp, if (networkState.isOnline) Color(0xFF4ADE80).copy(alpha = 0.4f) else Color(0xFFF43F5E).copy(alpha = 0.4f))
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(
                                    imageVector = if (networkState.isOnline) Icons.Default.Wifi else Icons.Default.WifiOff,
                                    contentDescription = null,
                                    tint = if (networkState.isOnline) Color(0xFF4ADE80) else Color(0xFFF43F5E),
                                    modifier = Modifier.size(16.dp)
                                )
                                Text(
                                    text = networkState.networkType,
                                    fontSize = 12.sp,
                                    fontFamily = FontFamily.Monospace,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Dashboard Widgets / Controls Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    // Focus Mode Toggle Card
                    Surface(
                        modifier = Modifier
                            .weight(1f)
                            .clickable { isFocusActive = !isFocusActive },
                        shape = RoundedCornerShape(16.dp),
                        color = Color.Black.copy(alpha = 0.4f),
                        border = BorderStroke(1.dp, if (isFocusActive) Color(0xFF4ADE80).copy(alpha = 0.6f) else Color.White.copy(alpha = 0.15f))
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Box(
                                    modifier = Modifier
                                        .size(32.dp)
                                        .clip(CircleShape)
                                        .background(if (isFocusActive) Color(0xFF4ADE80) else Color(0xFFE89F1F)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.SportsEsports,
                                        contentDescription = null,
                                        tint = Color.Black,
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                                Column {
                                    Text(
                                        text = "Focus Mode",
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                    Text(
                                        text = if (isFocusActive) "Active Protection" else "Tap to Enable",
                                        fontSize = 10.sp,
                                        fontFamily = FontFamily.Monospace,
                                        color = if (isFocusActive) Color(0xFF4ADE80) else Color.White.copy(alpha = 0.6f)
                                    )
                                }
                            }
                            if (isFocusActive) {
                                Box(
                                    modifier = Modifier
                                        .size(8.dp)
                                        .clip(CircleShape)
                                        .background(Color(0xFF4ADE80))
                                )
                            }
                        }
                    }

                    // Tab Switcher (Installed vs System)
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color.Black.copy(alpha = 0.4f),
                        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f))
                    ) {
                        Row(modifier = Modifier.padding(4.dp), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(if (activeTab == "installed") Color(0xFFE89F1F) else Color.Transparent)
                                    .clickable { activeTab = "installed" }
                                    .padding(horizontal = 12.dp, vertical = 8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "Installed",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (activeTab == "installed") Color.Black else Color.White.copy(alpha = 0.7f)
                                )
                            }

                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(if (activeTab == "system") Color(0xFF38BDF8) else Color.Transparent)
                                    .clickable { activeTab = "system" }
                                    .padding(horizontal = 12.dp, vertical = 8.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "System",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (activeTab == "system") Color.Black else Color.White.copy(alpha = 0.7f)
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // App List Header & Count
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${activeTab.uppercase()} APPS ($activeCount active / $totalCount total)",
                        fontSize = 10.sp,
                        fontFamily = FontFamily.Monospace,
                        color = Color.White.copy(alpha = 0.6f)
                    )
                    Text(
                        text = "Storage: ${storageUsedGb}GB / ${storageTotalGb}GB",
                        fontSize = 10.sp,
                        fontFamily = FontFamily.Monospace,
                        color = Color(0xFFE89F1F)
                    )
                }

                Spacer(modifier = Modifier.height(6.dp))

                // App Cards List
                LazyColumn(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(filteredApps) { app ->
                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = Color.Black.copy(alpha = 0.35f),
                            border = BorderStroke(1.dp, Color.White.copy(alpha = 0.12f))
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(RoundedCornerShape(10.dp))
                                            .background(if (app.isRunning) Color(0xFF4ADE80).copy(alpha = 0.2f) else Color.White.copy(alpha = 0.1f)),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Icon(
                                            imageVector = if (app.isRunning) Icons.Default.CheckCircle else Icons.Default.Stop,
                                            contentDescription = null,
                                            tint = if (app.isRunning) Color(0xFF4ADE80) else Color.White.copy(alpha = 0.5f),
                                            modifier = Modifier.size(20.dp)
                                        )
                                    }

                                    Column {
                                        Text(
                                            text = app.name,
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = Color.White
                                        )
                                        Text(
                                            text = "${app.packageName} • v${app.version}",
                                            fontSize = 9.sp,
                                            fontFamily = FontFamily.Monospace,
                                            color = Color.White.copy(alpha = 0.5f)
                                        )
                                    }
                                }

                                Column(horizontalAlignment = Alignment.End) {
                                    Text(
                                        text = if (app.isRunning) "${app.ramUsageMb} MB" else "Stopped",
                                        fontSize = 11.sp,
                                        fontFamily = FontFamily.Monospace,
                                        fontWeight = FontWeight.Bold,
                                        color = if (app.isRunning) Color(0xFF38BDF8) else Color.White.copy(alpha = 0.4f)
                                    )
                                    if (app.permissions.isNotEmpty()) {
                                        Text(
                                            text = app.permissions.joinToString(", "),
                                            fontSize = 9.sp,
                                            fontFamily = FontFamily.Monospace,
                                            color = Color(0xFFE89F1F)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // Footer Credit Tag
                Box(
                    modifier = Modifier.fillMaxWidth(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "created by rider",
                        fontSize = 10.sp,
                        fontFamily = FontFamily.Monospace,
                        color = Color.White.copy(alpha = 0.6f)
                    )
                }
            }
        }
    }
}
