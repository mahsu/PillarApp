.PHONY: setup

install-migrate:
	go get github.com/lib/pq
	go get github.com/golang-migrate/migrate
	go install -tags 'postgres' github.com/golang-migrate/migrate/cli
	cd $$GOPATH/bin && mv cli migrate

setup-postgres-users:
	psql -f dev/dev_database_setup.up.sql

setup-mock-db:
	PGPASS='algovc' \
	psql -U 'algovc' -d 'algovc' -f dev/dev_mock_db.sql

setup: install-migrate setup-postgres-users migrate-up setup-mock-db
	mkdir -p vendor
	mkdir -p bin
	dep ensure

clean: migrate-down clean-postgres-users clean-migrate
	rm -rf bin
	rm -rf vendor

clean-migrate:
	rm $$GOPATH/bin/migrate

clean-postgres-users:
	psql -f dev/dev_database_setup.down.sql

migrate-up:
	migrate -database postgres://algovc:algovc@localhost:5432/algovc?sslmode=disable -path ./migrations up

migrate-down:
	migrate -database postgres://algovc:algovc@localhost:5432/algovc?sslmode=disable -path ./migrations down

build:
	mkdir -p bin
	go build -o bin/main src/main.go

run:
	go run src/main.go
