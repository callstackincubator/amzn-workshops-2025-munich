import ReactBrownfield
import SwiftUI

struct Constants {
    static let reactNativeCategory = "React Native"
    static let categories = [
        "Movies",
        "TV Shows",
        reactNativeCategory,
        "Sports",
        "News",
    ]
    static let reactNativeCategoryIndex =
        categories.firstIndex(of: reactNativeCategory) ?? 0
}

struct ContentView: View {
    @State private var selectedCategory = 0
    @State private var isSettingsEnabled = false
    @Namespace private var animation

    var showReactNative: Bool {
        selectedCategory == Constants.reactNativeCategoryIndex
    }

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 24) {
                if !showReactNative {
                    Text("iOS SwiftUI Demo")
                        .font(.largeTitle)
                        .bold()
                }

                // Categories Row
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 16) {
                        ForEach(Constants.categories.indices, id: \.self) {
                            index in
                            let category = Constants.categories[index]
                            Button(action: {
                                withAnimation(.easeInOut(duration: 0.3)) {
                                    selectedCategory = index
                                }
                            }) {
                                Text(category)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .background(
                                        RoundedRectangle(cornerRadius: 8)
                                            .fill(
                                                selectedCategory == index
                                                    ? Color.accentColor
                                                    : Color(.systemGray5)
                                            )
                                    )
                                    .foregroundColor(
                                        selectedCategory == index
                                            ? .white : .primary
                                    )
                            }
                        }
                    }
                }

                if !showReactNative {
                    // Settings Toggle
                    Toggle(isOn: $isSettingsEnabled.animation(.easeInOut)) {
                        Text(
                            isSettingsEnabled
                                ? "Settings Enabled" : "Settings Disabled"
                        )
                        .font(.body)
                    }
                    .toggleStyle(SwitchToggleStyle(tint: .accentColor))
                }

                // Content Area
                ZStack {
                    if showReactNative {
                        // React Native View
                        ReactNativeView(moduleName: "RockRNApp")
                            .navigationBarHidden(true)
                    } else {
                        Text(
                            "Currently selected: \(Constants.categories[selectedCategory]) \(isSettingsEnabled ? "(Settings Enabled)" : "")"
                        )
                        .font(.body)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .multilineTextAlignment(.center)
                        .padding()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(16)
                .animation(.easeInOut(duration: 0.3), value: showReactNative)
            }
            .padding(showReactNative ? 4 : 32)
            .animation(.easeInOut(duration: 0.8), value: showReactNative)
            .navigationTitle("Main Screen")
            .toolbar {
                // Simulate BackHandler (only active when not home)
                if selectedCategory > 0 {
                    Button("Back") {
                        withAnimation {
                            selectedCategory = 0
                        }
                    }
                }
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: { dismiss() }) {
                    Label("Back", systemImage: "chevron.left")
                        .labelStyle(.titleAndIcon)
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
