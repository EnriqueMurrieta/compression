import os
import pickle

def decompress_file(input_file, output_file, codebook_file):
    # Read compressed file as bytes
    with open(input_file, 'rb') as file:
        compressed_bytes = file.read()

    # Load codebook from codebook file
    with open(codebook_file, 'rb') as file:
        codebook = pickle.load(file)

    prefix_code_dict = codebook['prefix_code_dict']
    padding_bits = codebook['padding_bits']

    # Convert bytes to binary string
    compressed_text = ''.join(format(byte, '08b') for byte in compressed_bytes)

    # Remove padding bits
    compressed_text = compressed_text[:-padding_bits]

    # Reverse the prefix code dictionary
    reverse_prefix_code_dict = {v: k for k, v in prefix_code_dict.items()}

    # Decompress text
    decompressed_text = ""
    code = ""
    for bit in compressed_text:
        code += bit
        if code in reverse_prefix_code_dict:
            char = reverse_prefix_code_dict[code]
            decompressed_text += char
            code = ""

    # Write decompressed text to output file
    with open(output_file, 'w') as file:
        file.write(decompressed_text)

# Usage example
input_file = "compressed.bin"
output_file = "decompressed.txt"
codebook_file = "compressed.pkl"
decompress_file(input_file, output_file, codebook_file)
