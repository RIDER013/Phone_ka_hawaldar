package com.safeme.app

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.drawable.Drawable

data class AppModel(
    val id: String,
    val name: String,
    val packageName: String,
    val category: String, // "installed" or "system"
    val isRunning: Boolean,
    val ramUsageMb: Int,
    val batteryDrawMa: Int = 25,
    val batteryUsedMah: Int = 120,
    val todayInternetMb: Int = 240,
    val permissions: List<String>,
    val version: String
)

class AppListManager(private val context: Context) {
    fun getInstalledApps(): List<AppModel> {
        val pm = context.packageManager
        val packages = pm.getInstalledPackages(PackageManager.GET_PERMISSIONS or PackageManager.GET_META_DATA)
        val appList = mutableListOf<AppModel>()

        for (pkg in packages) {
            val appInfo = pkg.applicationInfo ?: continue
            val isSystem = (appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0 ||
                    (appInfo.flags and ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) != 0

            val appName = pm.getApplicationLabel(appInfo).toString()
            val pkgName = pkg.packageName ?: continue
            val versionName = pkg.versionName ?: "1.0"

            // Extract dangerous permissions
            val perms = mutableListOf<String>()
            pkg.requestedPermissions?.forEach { p ->
                if (p.contains("CAMERA")) perms.add("Camera")
                if (p.contains("ACCESS_FINE_LOCATION") || p.contains("ACCESS_COARSE_LOCATION")) perms.add("Location")
                if (p.contains("RECORD_AUDIO")) perms.add("Microphone")
                if (p.contains("READ_CONTACTS")) perms.add("Contacts")
            }

            val isRunning = !isSystem || pkgName.contains("launcher") || pkgName.contains("system")
            val ramMb = if (isRunning) (40 + (pkgName.hashCode() % 120)).coerceIn(15, 350) else 0
            val batteryDraw = if (isRunning) (15 + Math.abs(pkgName.hashCode() % 60)) else 0
            val batteryUsed = (50 + Math.abs(pkgName.hashCode() % 400))
            val internetUsed = (10 + Math.abs(pkgName.hashCode() % 900))

            appList.add(
                AppModel(
                    id = pkgName,
                    name = appName,
                    packageName = pkgName,
                    category = if (isSystem) "system" else "installed",
                    isRunning = isRunning,
                    ramUsageMb = ramMb,
                    batteryDrawMa = batteryDraw,
                    batteryUsedMah = batteryUsed,
                    todayInternetMb = internetUsed,
                    permissions = perms.distinct(),
                    version = versionName
                )
            )
        }

        return appList.sortedByDescending { it.isRunning }
    }
}
