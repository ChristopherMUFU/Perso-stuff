@echo OFF

color 3
echo #------------------------------START SERVER-------------------#
adb devices
adb reverse tcp:8081 tcp:8081

color 2
echo #------------------------------ENJOY-------------------#
react-native start
