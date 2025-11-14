package com.workshops.brownfieldtestapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.fragment.compose.AndroidFragment
import com.callstack.reactnativebrownfield.ReactNativeFragment
import com.callstack.reactnativebrownfield.constants.ReactNativeFragmentArgNames
import com.rockrnappreact.ReactNativeHostManager
import com.workshops.brownfieldtestapp.ui.theme.BrownfieldTestAppandroidTheme

object Constants {
    val ReactNativeCategory = "React Native"

    val Categories = listOf(
        "Movies",
        "TV Shows",
        ReactNativeCategory,
        "Sports",
        "News"
    )

    val ReactNativeCategoryIndex = Categories.indexOf(ReactNativeCategory)
}

class MainActivity : AppCompatActivity() {
    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize React Native
        ReactNativeHostManager.initialize(this.application) {
            println("JS bundle loaded")
        }

        setContent {
            BrownfieldTestAppandroidTheme(darkTheme = true) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    shape = RectangleShape
                ) {
                    MainScreen()
                }
            }
        }
    }
}

@Composable
fun MainScreen() {
    val context = LocalContext.current
    var selectedCategory by remember { mutableStateOf(0) }
    var isSettingsEnabled by remember { mutableStateOf(false) }

    val showReactNative = selectedCategory == Constants.ReactNativeCategoryIndex

    BackHandler(enabled = selectedCategory > 0) {
        Toast.makeText(context, "Native - returning home", Toast.LENGTH_SHORT)
            .show()
        selectedCategory = 0
    }

    val rootContentPadding by animateDpAsState(
        targetValue = if (showReactNative) 4.dp else 32.dp,
        label = "paddingAnim",
        animationSpec = tween(
            durationMillis = 800,
            easing = FastOutSlowInEasing
        ),
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(rootContentPadding)
            .animateContentSize()
    ) {
        if (!showReactNative) {
            // Title
            Text(
                text = "Android TV Demo",
                style = MaterialTheme.typography.headlineLarge,
                modifier = Modifier.padding(bottom = 24.dp),
            )
        }

        // Categories
        Row(
            modifier = Modifier.padding(bottom=24.dp).horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            Constants.Categories.forEachIndexed { index, category ->
                val active = selectedCategory == index

                Button(
                    onClick = { selectedCategory = index },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (active)
                            MaterialTheme.colorScheme.primary
                        else
                            MaterialTheme.colorScheme.surface
                    )
                ) {
                    Text(
                        category,
                        color = if (active) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        if (!showReactNative) {
            // Settings Toggle
            Row(
                modifier = Modifier.padding(bottom = 24.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Switch(
                    checked = isSettingsEnabled,
                    onCheckedChange = { isSettingsEnabled = it },
                    modifier = Modifier.padding(end = 16.dp)
                )
                Text(
                    text = if (isSettingsEnabled) "Settings Enabled" else "Settings Disabled",
                    style = MaterialTheme.typography.bodyLarge
                )
            }
        }

        // Content Preview
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(top = if (showReactNative) 0.dp else 24.dp)
        ) {
            if (showReactNative) {
                AndroidFragment<ReactNativeFragment>(
                    arguments = Bundle().apply {
                        putString(ReactNativeFragmentArgNames.ARG_MODULE_NAME, "RockRNApp")
                    }, modifier = Modifier
                        .fillMaxSize()
                )
            } else {
                Text(
                    text = "Currently selected: ${
                        Constants.Categories[selectedCategory]
                    } ${if (isSettingsEnabled) "(Settings Enabled)" else ""}",
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.align(Alignment.Center)
                )
            }
        }
    }
}