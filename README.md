# Digital Wrapping
## 注意
「srcフォルダ」以外は書き換えない \
ビルドはローカルのみで反映させる \
バックエンドはセキュリティの関係上まだ公開していないため詳しくは@kami9811（Twitter: @yuta_ninja08）まで

## Dependencies
npm install cordova-plugin-nativestorage \
npm install @ionic-native/native-storage \
npm install cordova-plugin-camera \
npm install @ionic-native/camera \
npm install cordova-plugin-ble-central \
npm install @ionic-native/ble

## permission -> info.plist
<key>NSBluetoothAlwaysUsageDescription</key> \
<string>室内位置情報測位のために利用します.</string>

## Build
### 1st time
(iOS) \
ionic cap sync \
ionic build --prod \
ionic cap add ios \
ionic cap open ios \
(Android) \
ionic cap sync \
ionic build --prod \
ionic cap add android \
ionic cap open android
### 2nd ~
ionic build --prod \
ionic cap copy xxx \
ionic cap open xxx
