#!/bin/bash

compressed_file="compressed.txt"
output_file="output.txt"

# Read the compressed data from the file
compressed_data=$(<"$compressed_file")

# Read the codebook from the compressed data
codebook=$(echo "$compressed_data" | awk '/^$/{exit} {print}')
compressed_data=$(echo "$compressed_data" | awk '/^$/{p=1;next} p')

# Read the codebook entries into an associative array
declare -A codebook_entries
while IFS=" " read -r code code_length; do
    codebook_entries["$code"]="$code_length"
done <<< "$codebook"

# Decoding the compressed data
current_bit=""
decoded_data=""
for bit in $(fold -w1 <<< "$compressed_data"); do
    current_bit+="$bit"
    if [[ -v codebook_entries["$current_bit"] ]]; then
        decoded_data+=$(printf '\\%03o' "${codebook_entries["$current_bit"]}")
        current_bit=""
    fi
done

# Write the decoded data to the output file
echo -n -e "$decoded_data" > "$output_file"

echo "File decompressed successfully!"
