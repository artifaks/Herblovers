
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Herb, herbCategories } from "@/data/herbs";

export default function HerbAdminForm() {
  // Use react-hook-form for validation and form management
  const form = useForm<Herb>({
    defaultValues: {
      id: "",
      name: "",
      scientificName: "",
      category: "",
      description: "",
      benefits: [""],
      usage: "",
      cautions: [""],
      preparations: [{ type: "", description: "", dosage: "" }],
      benefitScores: [{ category: "", score: 0 }],
      complementaryHerbs: [{ name: "", description: "" }],
      origin: "",
      harvestSeason: "",
      parts: [""],
      traditionalUses: [""],
      constituents: [""],
      sustainabilityInfo: "",
      growingInfo: "",
      safetyProfile: {
        safetyRating: "Generally Safe",
        sideEffects: [""],
        contraindications: [""],
        pregnancySafety: "",
        childrenSafety: "",
        pregnancySafe: false,
        interactions: [""],
        dosageLimit: ""
      },
      scientificResearch: [
        {
          title: "",
          summary: "",
          source: "",
          type: "",
          url: ""
        }
      ],
      tags: [""],
      audience: [""]
    }
  });

  // Extract categories from the herbCategories array
  const categories = herbCategories.map(category => category.id);

  // Handle form submission
  const onSubmit = (data: Herb) => {
    console.log("Herb submitted:", data);
    // Future: Save to backend
    toast({
      title: "Herb Saved",
      description: `${data.name} has been successfully saved.`,
    });
  };

  // Helper function to add items to arrays in the form
  const addItemToArray = (fieldName: string, defaultValue: any) => {
    const currentValues = form.getValues(fieldName as any) || [];
    form.setValue(fieldName as any, [...currentValues, defaultValue]);
  };

  // Helper function to remove items from arrays in the form
  const removeItemFromArray = (fieldName: string, index: number) => {
    const currentValues = form.getValues(fieldName as any);
    if (currentValues.length > 1) {
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      form.setValue(fieldName as any, newValues);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Herb Administration</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Herb Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chamomile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scientificName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scientific Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Matricaria chamomilla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a comprehensive description of the herb..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Usage */}
          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How is this herb commonly used?" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-medium mb-2">Benefits</h3>
            <div className="space-y-2">
              {form.watch("benefits")?.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`benefits.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Benefit ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeItemFromArray("benefits", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addItemToArray("benefits", "")}
              >
                Add Benefit
              </Button>
            </div>
          </div>

          {/* Origin */}
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin</FormLabel>
                <FormControl>
                  <Textarea placeholder="Where does this herb originate from?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Harvest Season */}
          <FormField
            control={form.control}
            name="harvestSeason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harvest Season</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Summer, Late Spring" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Growing Info */}
          <FormField
            control={form.control}
            name="growingInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Growing Information</FormLabel>
                <FormControl>
                  <Textarea placeholder="How is this herb grown?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sustainability Info */}
          <FormField
            control={form.control}
            name="sustainabilityInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sustainability Information</FormLabel>
                <FormControl>
                  <Textarea placeholder="Information about sustainable harvesting and cultivation..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Submission */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Save Herb</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
