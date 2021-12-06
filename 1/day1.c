#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Day 1-1
int a()
{
	FILE * input = fopen("./input", "r");
	if (input == NULL) return EXIT_FAILURE;
	char * line = (char *) malloc(sizeof(char));
	size_t len;
	ssize_t size;
	int depth, last;
	int count = 0;
	getline(&line, &len, input);
	last = atoi(line);
	while ((size = getline(&line, &len, input)) != -1) {
		depth = atoi(line);
		count += depth > last;
		last = depth;
	}
	printf("Result : %d\n", count);
	return EXIT_SUCCESS;
}

// Day 1-2
int b()
{
	FILE * input = fopen("./input", "r");
	if (input == NULL) return EXIT_FAILURE;
	char * line = (char *) malloc(sizeof(char));
	size_t len;
	ssize_t size;
	int vals = 0;
	int * values = (int *) malloc(sizeof(int));
	int * groups = (int *) malloc(sizeof(int));
	int last, count = 0;
	while ((size = getline(&line, &len, input)) != -1)
	{
		values = (int *) realloc(values, sizeof(int) * (++vals));
		*(values + vals - 1) = atoi(line);
	}

	groups = (int *) realloc(groups, sizeof(int) * vals - 2);

	for (int i = 0; i < vals - 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			*(groups + i) += *(values + i + j);
			if (i == 0) last = *(groups);
		}
		count += *(groups + i) > last;
		last = *(groups + i);
	}
	printf("Résultat : %d\n", count);
	return EXIT_SUCCESS;
}

int main()
{
	a();
	b();
	return 0;
}