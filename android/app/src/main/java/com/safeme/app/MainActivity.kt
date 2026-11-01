package com.safeme.app

import android.os.Bundle
import android.webkit.JavascriptInterface
import com.getcapacitor.BridgeActivity
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Expose real Android device installed apps & permissions to the WebView UI
        try {
            bridge?.webView?.addJavascriptInterface(AndroidBridge(this), "AndroidBridge")
        } catch (_: Exception) {}
    }
}

class AndroidBridge(private val context: android.content.Context) {
    @JavascriptInterface
    fun getInstalledAppsJson(): String {
        val appListManager = AppListManager(context)
        val apps = appListManager.getInstalledApps()
        val jsonArray = JSONArray()
        for (app in apps) {
            val obj = JSONObject()
            obj.put("id", app.id)
            obj.put("name", app.name)
            obj.put("packageName", app.packageName)
            obj.put("category", app.category)
            obj.put("isRunning", app.isRunning)
            obj.put("ramUsageMb", app.ramUsageMb)
            obj.put("batteryDrawMa", app.batteryDrawMa)
            obj.put("batteryUsedMah", app.batteryUsedMah)
            obj.put("todayInternetMb", app.todayInternetMb)
            obj.put("version", app.version)
            
            val permsArray = JSONArray()
            for (perm in app.permissions) {
                permsArray.put(perm)
            }
            obj.put("permissions", permsArray)
            jsonArray.put(obj)
        }
        return jsonArray.toString()
    }
}
