#!/bin/bash

input_file="input.txt"
compressed_file="compressed.txt"

# Calculate the frequency of each character in the input file
declare -A frequencies
while IFS= read -r -n1 char; do
    frequencies["$char"]=$(( frequencies["$char"] + 1 ))
done < "$input_file"

# Build a priority queue based on character frequencies
priority_queue=""
for char in "${!frequencies[@]}"; do
    priority_queue+="$(printf "%d %d\n" "${frequencies["$char"]}" "'$char")"
done

# Sort the priority queue based on frequencies in descending order
sorted_queue=$(echo -e "$priority_queue" | sort -rn)

# Build the codebook based on the sorted priority queue
codebook=""
code_length=1
while IFS=" " read -r frequency char_code; do
    codebook+="$(printf "%s %s\n" "$char_code" "${code_length}")"
    code_length=$(( code_length + 1 ))
done <<< "$sorted_queue"

# Compress the input file using the codebook
compressed_data=""
while IFS= read -r -n1 char; do
    while IFS=" " read -r code code_length; do
        if [[ $char == "$(printf '\\%03o' "$code")" ]]; then
            compressed_data+=$(printf "%0${code_length}d" 0)
        fi
    done <<< "$codebook"
done < <(cat "$input_file" | od -An -tuC)

# Write the codebook and compressed data to the compressed file
echo -n "$codebook"$'\n'"$compressed_data" > "$compressed_file"

echo "File compressed successfully!"
