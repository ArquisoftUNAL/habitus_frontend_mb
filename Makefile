start:
	 npm run android

get-devices:
	adb devices

run-on-device:
	adb -s ${device} reverse tcp:8081 tcp:8081

server-PID:
	netstat -ano | findstr :8081

kill-server:
	taskkill /PID ${PID} /F