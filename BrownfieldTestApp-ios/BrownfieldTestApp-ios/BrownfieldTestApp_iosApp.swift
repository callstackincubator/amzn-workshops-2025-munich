import SwiftUI
import ReactBrownfield // import RN Brownfield
import RockRNAppReact // this import contains ReactNativeBundle

@main
struct BrownfieldTestApp_iosApp: App {
    // add the init method below
    init() {
        ReactNativeBrownfield.shared.bundle = ReactNativeBundle
        ReactNativeBrownfield.shared.startReactNative {
            print("React Native bundle loaded")
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
